/*
 * @Author: linqibin
 * @Date: 2025-06-03 08:59:33
 * @LastEditors: linqibin
 * @LastEditTime: 2025-06-16 15:00:23
 * @Description: 
 * 
 * Copyright (c) 2025 by 智慧空间研究院/金地空间科技, All Rights Reserved. 
 */
import { Image, Input, ITouchEvent, View } from "@tarojs/components";
import "./index.scss";

interface SearchProps {
  onClick?: (event: ITouchEvent) => void;
  onFocus?: (event: ITouchEvent) => void;
  onBlur?: (event: ITouchEvent) => void;
  focus?: boolean;
  disabled?: boolean;
  value?: string;
  onInput?: (event: ITouchEvent) => void;
  onConfirm?: (event: ITouchEvent) => void;
}

const Search: React.FC<SearchProps> = ({
  onClick,
  focus,
  onFocus,
  onBlur,
  disabled,
  value,
  onInput,
  onConfirm,
}) => {

  return (
    <View className='search-box' onTap={onClick}>
      <Input
        disabled={disabled}
        type='text'
        placeholder='请输入'
        className='search-input'
        focus={focus}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        confirmType='search'
        onInput={onInput}
        onConfirm={onConfirm}
      />
      <Image
        src={require("@/assets/images/icon/search.png")}
        className='search-icon'
        onTap={onConfirm}
      />
    </View>
  );
};
export default Search;
