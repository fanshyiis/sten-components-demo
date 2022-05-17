---
sidemenu: false
---

# 快速开始

## Vue

### 1.引入

```js
import '@sten-design/themes';
import { defineCustomElements } from '@sten-design/components';

defineCustomElements();
```

### 2. vue 文件

```html
<template>
  <sten-button type="primary" @click="clickHandle">2</sten-button>
</template>

<script lang="ts" setup>
  const clickHandle = () => console.log('我点击了');
</script>
```

## React

待补充
