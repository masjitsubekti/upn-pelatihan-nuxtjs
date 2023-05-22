import dayjs from 'dayjs'
export const numbering = {
  data() {
    return {
      units : ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    }
  },
  methods: {
    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    terbilang: function (bilangan, sufix) {
      bilangan = String(bilangan)
      var angka = new Array(
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0'
      )
      var kata = new Array(
        '',
        'Satu',
        'Dua',
        'Tiga',
        'Empat',
        'Lima',
        'Enam',
        'Tujuh',
        'Delapan',
        'Sembilan'
      )
      var tingkat = new Array('', 'Ribu', 'Juta', 'Milyar', 'Triliun')

      var panjang_bilangan = bilangan.length

      /* pengujian panjang bilangan */
      if (panjang_bilangan > 15) {
        kaLimat = 'Diluar Batas'
        return kaLimat
      }
      /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
      for (let a = 1; a <= panjang_bilangan; a++) {
        angka[a] = bilangan.substr(-a, 1)
      }
      var i = 1
      var j = 0
      var kaLimat = ''

      /* mulai proses iterasi terhadap array angka */
      while (i <= panjang_bilangan) {
        var subkaLimat = ''
        var kata1 = ''
        var kata2 = ''
        var kata3 = ''

        /* untuk Ratusan */
        if (angka[i + 2] != '0') {
          if (angka[i + 2] == '1') {
            kata1 = 'Seratus'
          } else {
            kata1 = kata[angka[i + 2]] + ' Ratus'
          }
        }

        /* untuk Puluhan atau Belasan */
        if (angka[i + 1] != '0') {
          if (angka[i + 1] == '1') {
            if (angka[i] == '0') {
              kata2 = 'Sepuluh'
            } else if (angka[i] == '1') {
              kata2 = 'Sebelas'
            } else {
              kata2 = kata[angka[i]] + ' Belas'
            }
          } else {
            kata2 = kata[angka[i + 1]] + ' Puluh'
          }
        }

        /* untuk Satuan */
        if (angka[i] != '0') {
          if (angka[i + 1] != '1') {
            kata3 = kata[angka[i]]
          }
        }

        /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
        if (angka[i] != '0' || angka[i + 1] != '0' || angka[i + 2] != '0') {
          subkaLimat =
            kata1 + ' ' + kata2 + ' ' + kata3 + ' ' + tingkat[j] + ' '
        }

        /* gabungkan variabe sub kaLimat (untuk Satu blok 3 angka) ke variabel kaLimat */
        kaLimat = subkaLimat + kaLimat
        i = i + 3
        j = j + 1
      }

      /* mengganti Satu Ribu jadi Seribu jika diperlukan */
      if (angka[5] == '0' && angka[6] == '0') {
        kaLimat = kaLimat.replace('Satu Ribu', 'Seribu')
      }

      return kaLimat + sufix
    },
  },
  niceBytes(x){

    let l = 0, n = parseInt(x, 10) || 0;

    while(n >= 1024 && ++l){
        n = n/1024;
    }
    
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + this.units[l]);
  }
}
