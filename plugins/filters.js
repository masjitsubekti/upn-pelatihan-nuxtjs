/* eslint-disable import/order */
import vue from 'vue'

vue.filter('upper', val => val.toUpperCase())
vue.filter('lower', val => val.toLowerCase())
vue.filter('number', val => {
    if (!val) return 0
      return parseInt(val) < 0
        ? '(' + Number(Math.abs(parseInt(val))).toLocaleString() + ')'
        : Number(Math.abs(parseInt(val))).toLocaleString()
})
vue.filter('decimal', val => {
  if (!val) return 0
    return (val) < 0
      ? '(' + Number(Math.abs((val))).toLocaleString() + ')'
      : Number(Math.abs((val))).toLocaleString()
})
vue.filter('thousand', val => {
  if (!val) return 0
    return  Number((parseInt(val))).toLocaleString() 
})
vue.filter('replaceUnderscore', (value) => {
  if (!value) return ''
  value = value.toString()
  return value.replace(/_/g, ' ')
})
vue.filter('rupiah', (value) => {
  if (!value) return ''
  // let val = (value/1).toFixed(2).replace('.', ',') untuk menambahkan 00 di belakang (format rupiah)
  return 'Rp. '+value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
})
