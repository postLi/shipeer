<template>
  <button class="my-button flex" @click="handleClick">
    <span><slot></slot></span>
  </button>
</template>
<script>
  export default {
    name: 'myButton',

    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
<style scoped>
  .my-button{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    width: 60px;
    height: 30px;
    font-size: 12px;
    border-radius: 4px;
  }
</style>
