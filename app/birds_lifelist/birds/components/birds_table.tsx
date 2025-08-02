
"use client"

import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Button, Pagination} from "@heroui/react";
import { Bird } from "@/types/bird";

export const CheckIcon = () => {
  return (
    <svg
      fill="none"
      height={24}
      viewBox="0 0 24 24"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const MinusIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clip-rule="evenodd" />
    </svg>
  );
};

export const QuestionIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
    </svg>
  );
};

export const EditIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
    </svg>
  );
};

type Props = {
  birds: Bird[];
};

export const Birds_table = ({ birds }: Props) => {

    //観察ステータス
    const renderStatusChip = (status: string | null) => {
        if (!status) return <Chip color="default" startContent={<MinusIcon />} variant="flat">未観察</Chip>;
        switch (status) {
            case "observed":
                return <Chip color="success" startContent={<CheckIcon />} variant="flat">観察済</Chip>;
            case "not_observed":
                return <Chip color="default" startContent={<MinusIcon />} variant="flat">未観察</Chip>;
            case "uncertain":
                return <Chip color="warning" startContent={<QuestionIcon />} variant="flat">あやふや</Chip>;
            default:
                return <Chip color="default" startContent={<MinusIcon />} variant="flat">未観察</Chip>;
        }
    };

    //写真ランク
    const renderPhotoChip = (photoRank: string | null) => {
        if (!photoRank) return <Chip>写真なし...</Chip>;
        switch (photoRank) {
            case "none":
                return <Chip>写真なし...</Chip>;
            case "excellent":
                return <Chip color="danger">Excellent!!</Chip>;
            case "good":
                return <Chip color="warning">Good!!</Chip>;
            case "poor":
                return <Chip color="secondary">いまいち</Chip>;
            default:
                return <Chip>写真なし...</Chip>;
        }
    };

    // 日付フォーマット例（nullの場合は空欄）
    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

  return (
    <Table aria-label="Bird list table">
        <TableHeader>
            <TableColumn allowsSorting={true}>野鳥</TableColumn>
            <TableColumn>観察状況</TableColumn>
            <TableColumn>写真</TableColumn>
            <TableColumn>直近観察日</TableColumn>
            <TableColumn>操作</TableColumn>
        </TableHeader>
        <TableBody>
            {birds.map((bird) => (
                <TableRow key={bird.id}>
                    <TableCell>
                        <User
                        avatarProps={{ radius: "lg", src: "" }}
                        description={`${bird.taxonomy.order} ${bird.taxonomy.family} ${bird.taxonomy.genus}`}
                        name={bird.name}
                        >
                        {""}
                        </User>
                    </TableCell>
                    <TableCell>{renderStatusChip(bird.observation.status)}</TableCell>
                    <TableCell>{renderPhotoChip(bird.observation.photo_rank)}</TableCell>
                    <TableCell>{formatDate(bird.observation.last_observed_at)}</TableCell>
                    <TableCell>
                        <Button isIconOnly aria-label="Edit" color="primary" className="h-10" variant="bordered">
                            <EditIcon />
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  );
}