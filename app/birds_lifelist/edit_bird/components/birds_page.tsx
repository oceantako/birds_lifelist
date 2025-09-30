
"use client"

import React from "react";
import type {Selection} from "@heroui/react";
import {Card, CardHeader, CardBody, CardFooter, Image, Chip, Button, Modal, ModalHeader, ModalBody, ModalContent, ModalFooter, useDisclosure,
        RadioGroup, Radio, DatePicker, TimeInput, Select, SelectItem, Input, CheckboxGroup, Checkbox, Textarea, Divider
} from "@heroui/react";
import { Birds_table } from "./birds_table";
import { Bird } from "@/types/bird";

type Props = {
  birds: Bird[];
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

export const Birds_page = ({ birds }: Props) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <div className="flex justify-center">
            <div className="w-full sm:w-full md:w-11/12 2xl:w-2/3">
                <section className="my-10">
                    <Card>
                        <CardBody className="">
                            <div className="flex">
                                <Image isZoomed src="https://heroui.com/images/fruit-1.jpeg" width={260} height={260}/>
                                <div className="w-4/5">
                                    <div className="mt-5 mx-5 h-60">
                                        <div className="h-52">
                                            <p className="text-2xl text-neutral-900">リュウキュウサンコウチョウ（サンコウチョウ亜種）</p>
                                            <p className="text-sm text-neutral-600">スズメ目 カササギヒタキ科 サンコウチョウ属</p>
                                        </div>

                                        <div className="flex justify-end">
                                            <div className="flex mr-4 self-end">
                                                <div>観察ステータス：</div>
                                                <Chip color="default" startContent={<MinusIcon />} variant="flat">未観察</Chip>
                                            </div>
                                            <div className="flex self-end">
                                                <div>観察ステータス：</div>
                                                <Chip color="default" startContent={<MinusIcon />} variant="flat">未観察</Chip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </section>
                <section className="mt-20">
                    <div className="flex justify-between mb-3">
                        <div className="text-3xl">観察記録</div>
                        <Button onPress={onOpen}>観察記録を追加</Button>
                    </div>
                    <Card shadow="sm" className="my-2">
                        <CardBody className="">
                            <div className="flex">
                                <Image isZoomed src="https://heroui.com/images/fruit-1.jpeg" width={150} height={150}/>
                                <div className="w-11/12">
                                    <div className="mt-2 mx-5 h-28">
                                        <div className="h-28">
                                            <p className="text-2xl text-neutral-900">2025年8月3日</p>
                                            <p className="text-sm text-neutral-600">
                                                沖縄県への遠征探鳥にて。早朝、名護市の森林を歩いていた際に約20メートル先にひらひらと舞う黒い生物を発見した。
                                                最初はチョウかと思ったが、双眼鏡で観察してみるとサンコウチョウであることが分かった。
                                                場所から亜種のリュウキュウサンコウチョウであることを結論ずけた。
                                            </p>
                                        </div>

                                        <div className="flex justify-between">
                                            <div className="flex">
                                                <div className="flex mr-4 self-end">
                                                    <div>天候：</div>
                                                    <div>晴れ</div>
                                                </div>
                                                <div className="flex mr-4 self-end">
                                                    <div>時刻：</div>
                                                    <div>AM5:00</div>
                                                </div>
                                                <div className="flex mr-4 self-end">
                                                    <div>場所：</div>
                                                    <div>沖縄県/名護市の森林</div>
                                                </div>
                                                <div className="flex mr-4 self-end">
                                                    <div>雌雄：</div>
                                                    <div>♂</div>
                                                    <div>♀</div>
                                                </div>
                                            </div>
                                            <div className="flex self-end">
                                                <Chip color="warning" startContent={<QuestionIcon />} variant="flat">あやふや</Chip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <Card shadow="sm" className="my-2">
                        <CardBody className="">
                            <div className="flex">
                                <Image isZoomed src="https://heroui.com/images/fruit-1.jpeg" width={150} height={150}/>
                                <div className="w-11/12">
                                    <div className="mt-2 mx-5 h-28">
                                        <div className="h-28">
                                            <p className="text-2xl text-neutral-900">2025年8月3日</p>
                                            <p className="text-sm text-neutral-600">
                                                沖縄県への遠征探鳥にて。早朝、名護市の森林を歩いていた際に約20メートル先にひらひらと舞う黒い生物を発見した。
                                                最初はチョウかと思ったが、双眼鏡で観察してみるとサンコウチョウであることが分かった。
                                                場所から亜種のリュウキュウサンコウチョウであることを結論ずけた。
                                            </p>
                                        </div>

                                        <div className="flex justify-between">
                                            <div className="flex">
                                                <div className="flex mr-4 self-end">
                                                    <div>天候：</div>
                                                    <div>晴れ</div>
                                                </div>
                                                <div className="flex mr-4 self-end">
                                                    <div>時刻：</div>
                                                    <div>AM5:00</div>
                                                </div>
                                                <div className="flex mr-4 self-end">
                                                    <div>場所：</div>
                                                    <div>沖縄県/名護市の森林</div>
                                                </div>
                                                <div className="flex mr-4 self-end">
                                                    <div>雌雄：</div>
                                                    <div>♂</div>
                                                    <div>♀</div>
                                                </div>
                                            </div>
                                            <div className="flex self-end">
                                                <Chip color="warning" startContent={<QuestionIcon />} variant="flat">あやふや</Chip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <Card shadow="sm" className="my-2">
                        <CardBody className="">
                            <div className="flex">
                                <Image isZoomed src="https://heroui.com/images/fruit-1.jpeg" width={150} height={150}/>
                                <div className="w-11/12">
                                    <div className="mt-2 mx-5 h-28">
                                        <div className="h-28">
                                            <p className="text-2xl text-neutral-900">2025年8月3日</p>
                                            <p className="text-sm text-neutral-600">
                                                沖縄県への遠征探鳥にて。早朝、名護市の森林を歩いていた際に約20メートル先にひらひらと舞う黒い生物を発見した。
                                                最初はチョウかと思ったが、双眼鏡で観察してみるとサンコウチョウであることが分かった。
                                                場所から亜種のリュウキュウサンコウチョウであることを結論ずけた。
                                            </p>
                                        </div>

                                        <div className="flex justify-between">
                                            <div className="flex">
                                                <div className="flex mr-4 self-end">
                                                    <div>天候：</div>
                                                    <div>晴れ</div>
                                                </div>
                                                <div className="flex mr-4 self-end">
                                                    <div>時刻：</div>
                                                    <div>AM5:00</div>
                                                </div>
                                                <div className="flex mr-4 self-end">
                                                    <div>場所：</div>
                                                    <div>沖縄県/名護市の森林</div>
                                                </div>
                                                <div className="flex mr-4 self-end">
                                                    <div>雌雄：</div>
                                                    <div>♂</div>
                                                    <div>♀</div>
                                                </div>
                                            </div>
                                            <div className="flex self-end">
                                                <Chip color="warning" startContent={<QuestionIcon />} variant="flat">あやふや</Chip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </section>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="5xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">観察記録</ModalHeader>
                        <ModalBody>

                            <div style={{ width: '300', height: '200' }}>
                                <Button color="default" className="w-60 h-40">写真を登録</Button>
                                {/* <Image isZoomed src="https://heroui.com/images/fruit-1.jpeg" width={300} height={200}/> */}
                            </div>

                            <Divider className="mt-4" />

                            <div>観察日時</div>
                            <div className="flex">
                                <DatePicker className="max-w-[284px]" label="観察日" />
                                <TimeInput isRequired label="観察時刻" className="w-72 mx-3" />
                            </div>

                            <Divider className="mt-4" />

                            <div>天気</div>
                            <RadioGroup label="" orientation="horizontal">
                                <Radio value="sunny">晴れ</Radio>
                                <Radio value="cloudy">曇り</Radio>
                                <Radio value="rain">雨</Radio>
                                <Radio value="snow">雪</Radio>
                                <Radio value="fog">霧</Radio>
                                <Radio value="hail">雹</Radio>
                            </RadioGroup>

                            <Divider className="mt-4" />

                            <div>観察場所</div>
                            <div className="flex">
                                <Select className="w-40" label="場所-都道府県">
                                    {/* {animals.map((animal) => (
                                    <SelectItem key={animal.key}>{animal.label}</SelectItem>
                                    ))} */}
                                    <SelectItem key="01">北海道</SelectItem>
                                    <SelectItem key="02">青森</SelectItem>
                                </Select>
                                <Input label="場所-詳細" placeholder="新宿御苑など" type="text" className="w-96 mx-3" />
                            </div>

                            <Divider className="mt-4" />

                            <div>雌雄</div>
                            <CheckboxGroup color="secondary" defaultValue={["buenos-aires", "san-francisco"]} orientation="horizontal">
                                <Checkbox value="male">♂</Checkbox>
                                <Checkbox value="female">♀</Checkbox>
                                <Checkbox value="nonClear">不明</Checkbox>
                            </CheckboxGroup>

                            <Divider className="mt-4" />

                            <div>コメント</div>
                            <Textarea disableAnimation disableAutosize classNames={{ base: "max-w-5lx", input: "resize-y min-h-[40px]",}}
                                label="コメント" placeholder="" />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>キャンセル</Button>
                            <Button color="primary">保存</Button>
                        </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}