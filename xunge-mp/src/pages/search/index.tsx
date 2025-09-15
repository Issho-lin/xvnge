import Search from "@/components/Search";
import Taro, { useDidShow, useLoad } from "@tarojs/taro";
import { Image, ScrollView, View } from "@tarojs/components";
import { useState } from "react";
import Empty from '@/assets/images/empty.png'
import { useProductDoc } from "./hooks";
import "./index.scss";

const suggestions = ["GPU", "云服务", "AI算法", "存储", "IDC"];

const SearchPage: React.FC = () => {
  const [history, setHistory] = useState([]);
  const [refresherTriggered, setRefresherTriggered] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchType, setSearchType] = useState('')
  const [isSearch, setIsSearch] = useState(false);

  const {
    productList,
    docList,
    setProductList,
    setDocList,
    getProductDocList,
  } = useProductDoc();

  const onRefresherRefresh = async () => {
    setRefresherTriggered(true);
    if (searchKey) {
      await getProductDocList({ productName: searchKey });
    }
    setRefresherTriggered(false);
  };

  const onSearch = (value: string) => {
    setIsSearch(true);
    if (value) {
      const historyList = Taro.getStorageSync("searchHistory") || [];
      if (historyList.includes(value)) {
        historyList.splice(historyList.indexOf(value), 1);
      }
      historyList.unshift(value);
      Taro.setStorageSync("searchHistory", historyList);
      setHistory(historyList);
      getProductDocList({ productName: value });
    } else {
      setDocList([]);
      setProductList([]);
    }
  };

  useDidShow(() => {
    const historyList = Taro.getStorageSync("searchHistory") || [];
    setHistory(historyList);
  });

  useLoad((params) => {
    console.log(params);
    setSearchType(params?.type)
    if (params?.type === 'product') {
      Taro.setNavigationBarTitle({
        title: '搜索产品'
      })
    }
  })

  const onDetail = (id: number, type: string) => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}&type=${type}`
    });
  };

  return (
    <View className='search-page'>
      <Search
        focus
        value={searchKey}
        onInput={(e) => {
          setSearchKey(e.detail.value);
          setIsSearch(false);
        }}
        onConfirm={() => {
          onSearch(searchKey);
        }}
      />
      <ScrollView
        id='search-scroll-view'
        className='scroll-view'
        scrollY
        refresherEnabled
        enhanced
        refresherTriggered={refresherTriggered}
        onRefresherRefresh={onRefresherRefresh}
      >
        {!isSearch && !!history?.length && (
          <View className='search-suggestions'>
            <View className='search-suggestions-title'>搜索历史</View>
            <View className='search-suggestions-list'>
              {history.map((item, index) => {
                return (
                  <View
                    key={index}
                    className='search-suggestions-item'
                    onClick={() => {
                      setSearchKey(item);
                      onSearch(item);
                    }}
                  >
                    {item}
                  </View>
                );
              })}
            </View>
          </View>
        )}
        {!isSearch && (
          <View className='search-suggestions'>
            <View className='search-suggestions-title'>搜索建议</View>
            <View className='search-suggestions-list'>
              {suggestions.map((item, index) => {
                return (
                  <View
                    key={index}
                    className='search-suggestions-item'
                    onClick={() => {
                      setSearchKey(item);
                      onSearch(item);
                    }}
                  >
                    {item}
                  </View>
                );
              })}
            </View>
          </View>
        )}
        {!!isSearch && !!productList?.length && (
          <View className='search-result'>
            <View className='search-result-title'>产品</View>
            <View className='search-result-list'>
              {productList.map((item, index) => {
                return (
                  <View key={index} className='search-result-item' onTap={() => onDetail(item.id, 'product')}>
                    <Image
                      className='search-result-item-img'
                      mode='aspectFill'
                      src={item.productUrl}
                    />
                    <View className='search-result-item-title'>
                      {item.productName}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}
        {!!isSearch && searchType !== 'product' && !!docList?.length && (
          <View className='search-result'>
            <View className='search-result-title'>技术文档</View>
            <View className='search-result-list'>
              {docList.map((item, index) => {
                return (
                  <View key={index} className='search-result-item' onTap={() => onDetail(item.id, 'doc')}>
                    <Image
                      className='search-result-item-img'
                      mode='aspectFill'
                      src={item.docUrl || require("@/assets/images/document/1.png")}
                    />

                    <View className='search-result-item-title'>
                      {item.docName}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}
        {!!isSearch && !productList?.length && !docList?.length && (
          <View className='search-empty'>
            <Image className='search-empty-img' src={Empty} />
            <View className='search-empty-text'>什么也没搜到</View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default SearchPage;
