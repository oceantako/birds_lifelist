import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { AWS_BUCKET_NAME, AWS_PROPERTY_DIR } from "../../domain/const/awsConfigs.ts";
import { s3Client } from "../../lib/s3Client.ts";

export const webApp = new OpenAPIHono();

const echoRoute = createRoute({
  path: "/echo",
  method: "post",
  description: "受け取った入力値をそのまま応答する",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: z.object({
            input: z.string().openapi({
              example: "Hello World!",
              description: "入力",
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: z.object({
            result: z.string().openapi({
              example: "Hello World!",
              description: "応答",
            }),
          }),
        },
      },
    },
  },
});

const fileUploadRoute = createRoute({
  path: "/fileUpload",
  method: "post",
  description: "ファイルのアップロード",
  request: {
    body: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: z.object({
            file: z.any().openapi({
              type: "string",
              format: "binary",
              description: "ファイル",
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "OK",
    },
  },
});

const fileDownloadRoute = createRoute({
  path: "/fileDownload",
  method: "get",
  description: "指定したファイル名のファイルをダウンロードする",
  request: {
    query: z.object({
      fileName: z
        .string()
        //.min(3)
        .openapi({
          param: {
            name: "fileName",
            in: "query",
          },
          example: "ファイル名.pdf",
        }),
    }),
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/octet-stream": {
          schema: { type: "string", format: "binary" },
        },
      },
    },
  },
});

webApp.openapi(echoRoute, async (c) => {
  console.log("echoRoute");
  const body = await c.req.valid("json");
  return c.json({ result: body.input });
});

webApp.openapi(fileUploadRoute, async (c) => {
  const body = await c.req.parseBody();
  const file = body.file as File;

  if (!file) {
    return c.json({ error: "No file uploaded" }, 400);
  }

  const buffer = await file.arrayBuffer();
  const fileName = file.name;

  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: AWS_PROPERTY_DIR + fileName,
        Body: Buffer.from(buffer),
        ContentType: file.type,
      })
    );

    return c.json({ message: "File uploaded successfully", fileName });
  } catch (error) {
    return c.json({ error: "Failed to upload file", details: error }, 500);
  }
});

webApp.openapi(fileDownloadRoute, async (c) => {
  try {
    const fileName = c.req.query("fileName");

    if (!fileName) {
      return new Response("Filename is required", { status: 400 });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: AWS_PROPERTY_DIR + fileName,
    });

    const response = await s3Client.send(command);

    // URLエンコードされたファイル名を生成
    const encodedFileName = encodeURIComponent(fileName);

    return new Response(response.Body as ReadableStream, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${encodedFileName}"`,
      },
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    return new Response("Error downloading file", { status: 500 });
  }
});
