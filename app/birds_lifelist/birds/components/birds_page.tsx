
"use client"

import React from "react";
import type {Selection} from "@heroui/react";
import {Pagination, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/react";
import { Birds_table } from "./birds_table";
import { Bird } from "@/types/bird";

type Props = {
  birds: Bird[];
};

const status_labelMap: Record<string, string> = {
  not_observed: "未観察",
  observed: "観察済",
  uncertain: "あやふや",
};

const photo_rank_labelMap: Record<string, string> = {
  excellent: "excellent",
  good: "good",
  poor: "いまいち",
  none: "写真なし",
};

export const Birds_page = ({ birds }: Props) => {
    //ページネーション用
    const per_page = 10;
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(Math.ceil(birds.length / per_page));
    const [currentBirds, setCurrentBirds] = React.useState<Bird[]>([]);

    //ステータスドロップダウン
    const [statusSelectedKeys, setStatusSelectedKeys] = React.useState<Selection>(new Set(["not_observed","observed","uncertain"]));

    //写真ランクプドロップダウン
    const [photoRankSelectedKeys, setPhotoRankSelectedKeys] = React.useState<Selection>(new Set(["excellent","good","poor","none"]));

    //ドロップダウンが選択されたら1ページに戻す
    React.useEffect(() => {
        setCurrentPage(1);
    }, [statusSelectedKeys, photoRankSelectedKeys]);

    //野鳥フィルタリング
    React.useEffect(() => {
        const filtered_birds = birds.filter((bird) => {
            const status = bird.observation.status ?? "";
            const photoRank = bird.observation.photo_rank ?? "";

            const isStatusSelected =
            statusSelectedKeys === "all" || statusSelectedKeys.has(status);

            const isPhotoRankSelected =
            photoRankSelectedKeys === "all" || photoRankSelectedKeys.has(photoRank);

            return isStatusSelected && isPhotoRankSelected;
        });

        const total = Math.ceil(filtered_birds.length / per_page);
        setTotalPages(total);

        const offset = (currentPage - 1) * per_page;
        setCurrentBirds(filtered_birds.slice(offset, offset + per_page));

    }, [birds, statusSelectedKeys, photoRankSelectedKeys, currentPage]);

    return (
        <div className="flex justify-center">
            <div className="w-full sm:w-full md:w-11/12 lg:w-2/3">
                <section>
                    <div className="flex justify-between my-6">
                        <div className="flex h-12">
                            <Input placeholder="種/目/属/科" variant={"bordered"} className="min-w-72 h-12"/>
                            <Button color="primary" className="mx-3">検索</Button>
                        </div>
                        <div className="flex">
                            <div className="h-12 mx-4">
                                <Dropdown>
                                <DropdownTrigger>
                                    <Button className="capitalize" variant="bordered">
                                        観察状況で絞り込む
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu disallowEmptySelection closeOnSelect={false} selectedKeys={statusSelectedKeys}
                                        selectionMode="multiple" variant="shadow" onSelectionChange={setStatusSelectedKeys}>
                                    <DropdownItem key="not_observed">未観察</DropdownItem>
                                    <DropdownItem key="observed">観察済</DropdownItem>
                                    <DropdownItem key="uncertain">あやふや</DropdownItem>
                                </DropdownMenu>
                                </Dropdown>
                            </div>
                            <div className="h-12">
                                <Dropdown>
                                <DropdownTrigger>
                                    <Button className="capitalize" variant="bordered">
                                        写真評価で絞り込む
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu disallowEmptySelection closeOnSelect={false} selectedKeys={photoRankSelectedKeys}
                                        selectionMode="multiple" variant="bordered" onSelectionChange={setPhotoRankSelectedKeys}>
                                    <DropdownItem key="excellent">excellent</DropdownItem>
                                    <DropdownItem key="good">good</DropdownItem>
                                    <DropdownItem key="poor">いまいち</DropdownItem>
                                    <DropdownItem key="none">写真なし</DropdownItem>
                                </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="">
                    <Birds_table birds={currentBirds}></Birds_table>
                    <div className="mt-4 flex justify-center">
                        <Pagination color="secondary" page={currentPage} total={totalPages} onChange={setCurrentPage} />
                    </div>
                </section>
            </div>
        </div>
    );
}