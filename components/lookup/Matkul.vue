<template>
  <div>
    <v-dialog v-model="dialog" max-width="1000px" scrollable>
      <v-card>
        <v-card-title
          style="color: green; padding-top: 12px; padding-bottom: 12px"
        >
          <span style="font-size: 20px; padding-right: 10px">Lookup Mata Kuliah</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeLookup()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <br />
          <v-row>
            <v-col cols="12" md="6"> </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                placeholder="Cari ..."
                v-model="search"
                hide-details
                outlined
                dense
                @keyup.enter="handleApplyFilter()"
              ></v-text-field>
            </v-col>
          </v-row>
          <br />
          <v-data-table
            :headers="headers"
            :items="data.items"
            item-key="id"
            class="elevation-1"
            :search="search"
            @click:row="selectItem"
            style="cursor: pointer"
            :items-per-page-options="[10, 15, 30, 50]"
            :server-items-length="data.meta.totalItems"
            :items-per-page="itemsPerPage"
            @update:page="handlePageChanged"
            @update:items-per-page="getItemPerPage"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import { tanggal } from "~/mixins/tanggal";
import { PAGE_SIZE } from "~/constants/global";

export default {
  props: {},
  mixins: [tanggal],
  data() {
    return {
      dialog: false,
      selected: [],
      headers: [
        {
          text: "Kode",
          value: "kodeMatkul",
          sortable: true,
          class: "th-head",
          width: "10%",
        },
        {
          text: "Nama",
          value: "namaMatkul",
          sortable: true,
          class: "th-head",
          width: "20%",
        },
        {
          text: "SKS",
          value: "sks",
          sortable: true,
          class: "th-head",
          width: "10%",
        },
      ],
      search: "",
      jumlah_sks: 0,
      defaultSortBy: "namaMatkul",
      sortBy: [this.defaultSortBy],
      sortDesc: [false],
      itemsPerPage: 10,
      page: 1,
      data: {
        items: [],
        meta: {
          totalItems: 0,
        },
      },
      filter: {
        q: "",
        pageSize: PAGE_SIZE,
        pageNumber: 1,
        sortBy: "namaMatkul",
        sortType: "asc",
      },
      isLoading: false,
    };
  },

  watch: {
    sortBy() {
      this.handleSort();
    },
    sortDesc() {
      this.handleSort();
    },
  },

  computed: {},
  methods: {
    loadMatkul() {
      this.loadAll();
      this.dialog = true;
    },

    async loadAll() {
      this.isLoading = true;
      this.$mataKuliahService()
        .retrieve(this.filter)
        .then((res) => {
          this.isLoading = false;
          this.data = {
            items: res.data.items || [],
            meta: res.data.meta,
          };
        })
        .catch(() => {
          this.isLoading = false;
        });
    },

    closeLookup() {
      this.dialog = false;
      this.selected = [];
    },

    selectItem(item) {
      this.selected = item;
      this.$emit("selected", this.selected);
      this.closeLookup();
    },

    handleRefreshItems() {
      const resetFilter = Object.assign({}, this.filter);
      resetFilter.q = "";
      resetFilter.pageNumber = 1;
      (resetFilter.t = Date.now()), (this.filter = resetFilter);
      this.handleApplyFilter();
    },

    handleApplyFilter() {
      this.filter = {
        q: this.search,
        pageSize: this.itemsPerPage,
        pageNumber: 1,
        sortBy: "nama",
        sortType: "asc",
      };
      this.loadAll();
    },

    handlePageChanged(page) {
      this.filter.pageNumber = page;
      this.loadAll();
    },

    getItemPerPage(val) {
      this.itemsPerPage = +val;
      this.filter.pageSize = this.itemsPerPage;
      this.loadAll();
    },
  },
};
</script>
