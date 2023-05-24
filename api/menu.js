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
    nama: "Pendaftaran MBKM",
    link: "/pendaftaran-mbkm",
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
        nama: "Jenis MBKM",
        link: "/master/jenis-mbkm",
        keterangan: "Menu Master Jenis MBKM",
        classIcon: null,
        level: 2,
        urutan: 1,
      },
    ],
  },
];

export default Menu;
