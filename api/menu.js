const Menu = [
  {
    nama: "Dashboard",
    link: "/dashboard",
    keterangan: "Menu Dashboard",
    classIcon: "mdi-home",
    level: 1,
    urutan: 1,
    children: null,
  },
  {
    nama: "Master Data",
    link: "#",
    keterangan: "Menu Master Data",
    classIcon: "mdi-database",
    level: 1,
    urutan: 2,
    children: [
      {
        nama: "Siswa",
        link: "/siswa",
        keterangan: "Menu Master Siswa",
        classIcon: null,
        level: 2,
        urutan: 1,
      },
      {
        nama: "Kelas Siswa",
        link: "/kelas-siswa",
        keterangan: "Menu Transaksi Kelas Siswa",
        classIcon: null,
        level: 2,
        urutan: 2,
      },
    ],
  },
];

export default Menu;
