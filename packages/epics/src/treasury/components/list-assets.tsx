'use client';
import { useState } from 'react';
import { Text } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  TabsContent,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@hypha-platform/ui/server';
import { Button, FilterMenu } from '@hypha-platform/ui';
import { CardAsset } from './card-asset';
import { formatCurrencyValue } from '@hypha-platform/ui-utils';

type AssetItem = {
  icon: string;
  name: string;
  symbol: string;
  value: number;
  usdEqual: number;
  type: string;
};

type ListAssetsProps = {
  assets: AssetItem[];
  balance: number;
  onLoadMore: () => void;
};

type OptionType = {
  label: string;
  value: string;
};

type FilterType = {
  value: string;
  options: OptionType[];
};

const assetsFilterSettings: FilterType = {
  value: 'most-recent',
  options: [
    { label: 'All', value: 'all' },
    { label: 'Most recent', value: 'most-recent' },
  ],
};

export const ListAssets: React.FC<ListAssetsProps> = ({
  assets,
  balance,
  onLoadMore,
}) => {
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mt-6">
        <Text className="text-lg">
          Balance | $ {formatCurrencyValue(balance)}
        </Text>
        <div className="flex items-center">
          <FilterMenu
            value={assetsFilterSettings.value}
            options={assetsFilterSettings.options}
          />
          <Button className="ml-2" variant="action" size="sm">
            <PlusIcon className="mr-2" />
            Add wallet
          </Button>
        </div>
      </div>
      <TabsContent value="treasury">
        <Tabs defaultValue="all" className="mt-3">
          <TabsList>
            <TabsTrigger value="all" variant="outlined">
              All
            </TabsTrigger>
            <TabsTrigger value="utility" variant="outlined">
              Utility
            </TabsTrigger>
            <TabsTrigger value="liquid" variant="outlined">
              Liquid
            </TabsTrigger>
            <TabsTrigger value="voice" variant="outlined">
              Voice
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="flex items-center flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6 w-full">
                {assets.map((asset) => (
                  <CardAsset
                    icon={asset.icon}
                    name={asset.name}
                    symbol={asset.symbol}
                    value={asset.value}
                    usdEqual={asset.usdEqual}
                    type={asset.type}
                  />
                ))}
              </div>
              <Button
                onClick={onLoadMore}
                className="rounded-lg w-fit mt-4"
                variant="outline"
                size="sm"
              >
                Load more assets
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="utility">
            <div className="my-4 flex items-center flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 w-full">
                {assets
                  .filter((asset) => asset.type === 'utility')
                  .map((asset) => (
                    <CardAsset
                      icon={asset.icon}
                      name={asset.name}
                      symbol={asset.symbol}
                      value={asset.value}
                      usdEqual={asset.usdEqual}
                      type={asset.type}
                    />
                  ))}
              </div>
              <Button
                onClick={onLoadMore}
                className="rounded-lg w-fit mt-4"
                variant="outline"
                size="sm"
              >
                Load more assets
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="liquid">
            <div className="my-4 flex items-center flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 w-full">
                {assets
                  .filter((asset) => asset.type === 'liquid')
                  .map((asset) => (
                    <CardAsset
                      icon={asset.icon}
                      name={asset.name}
                      symbol={asset.symbol}
                      value={asset.value}
                      usdEqual={asset.usdEqual}
                      type={asset.type}
                    />
                  ))}
              </div>
              <Button
                onClick={onLoadMore}
                className="rounded-lg w-fit mt-4"
                variant="outline"
                size="sm"
              >
                Load more assets
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="voice">
            <div className="my-4 flex items-center flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 w-full">
                {assets
                  .filter((asset) => asset.type === 'voice')
                  .map((asset) => (
                    <CardAsset
                      icon={asset.icon}
                      name={asset.name}
                      symbol={asset.symbol}
                      value={asset.value}
                      usdEqual={asset.usdEqual}
                      type={asset.type}
                    />
                  ))}
              </div>
              <Button
                onClick={onLoadMore}
                className="rounded-lg w-fit mt-4"
                variant="outline"
                size="sm"
              >
                Load more assets
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </TabsContent>
    </div>
  );
};
