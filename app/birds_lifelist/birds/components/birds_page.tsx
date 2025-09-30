
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

    //検索文字列
    const [searchWord, setSearchWord] = React.useState<string>("");

    //検索処理用文字列（検索ボタン押下時に更新）
    const [searchWordForFilter, setSearchWordForFilter] = React.useState<string>("");

    //ステータスドロップダウン
    const [statusSelectedKeys, setStatusSelectedKeys] = React.useState<Selection>(new Set(["not_observed","observed","uncertain"]));

    //写真ランクプドロップダウン
    const [photoRankSelectedKeys, setPhotoRankSelectedKeys] = React.useState<Selection>(new Set(["excellent","good","poor","none"]));

    //検索ボタン押下時
    const serchFromWords = () => {
        setCurrentPage(1);
        setSearchWordForFilter(searchWord);
    }

    //ドロップダウンが選択されたら1ページに戻す
    React.useEffect(() => {
        setCurrentPage(1);
    }, [statusSelectedKeys, photoRankSelectedKeys]);

    //野鳥フィルタリング
    React.useEffect(() => {
        filteringBirds();
    }, [birds, statusSelectedKeys, photoRankSelectedKeys, currentPage, searchWordForFilter]);

    //野鳥フィルタリング
    const filteringBirds = () => {
        const filtered_birds = birds.filter((bird) => {
            const status = bird.observation.status ?? "";
            const photoRank = bird.observation.photo_rank ?? "";

            const isStatusSelected =
            statusSelectedKeys === "all" || statusSelectedKeys.has(status);

            const isPhotoRankSelected =
            photoRankSelectedKeys === "all" || photoRankSelectedKeys.has(photoRank);

            const word = searchWordForFilter.trim().toLowerCase();
            const isMatchedSearchWord =
                word === "" ||
                bird.name.toLowerCase().includes(word) ||
                bird.taxonomy.order.toLowerCase().includes(word) ||
                bird.taxonomy.family.toLowerCase().includes(word) ||
                bird.taxonomy.genus.toLowerCase().includes(word);

            return isStatusSelected && isPhotoRankSelected && isMatchedSearchWord;
        });

        const total = Math.ceil(filtered_birds.length / per_page);
        setTotalPages(total);

        const offset = (currentPage - 1) * per_page;
        setCurrentBirds(filtered_birds.slice(offset, offset + per_page));
    }

    return (
        <div className="flex justify-center">
            <div className="w-full sm:w-full md:w-11/12 lg:w-2/3">
                <section>
                    <div className="flex justify-between my-6">
                        <div className="flex h-12">
                            <Input placeholder="種/目/属/科" variant={"bordered"} className="min-w-72 h-12" onChange={(e) => setSearchWord(e.target.value)}/>
                            <Button color="primary" className="mx-3" onClick={serchFromWords}>検索</Button>
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