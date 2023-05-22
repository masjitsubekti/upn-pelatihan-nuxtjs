<template>
  <v-container fluid>
    <div>
      <v-card class="crd-head">
        <v-toolbar flat dense>
          <v-btn color="success" outlined small>
            <v-icon small>mdi-plus-circle-outline</v-icon>
            Tambah Baru
          </v-btn>
          <v-spacer></v-spacer>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="success"
                v-bind="attrs"
                v-on="on"
                outlined
                small
              >
                <v-icon color="success" x-small>mdi-filter-variant</v-icon>
                Filters
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
        <v-card-text>
          <span><i>Jumlah Penelitian Anda : {{tableData.meta.totalItems}} Penelitian</i></span>
        </v-card-text>
      </v-card>
      <v-card class="crd-list my-3" v-for="(item, index) in tableData.items" :key="index">
        <v-card-title style="color: green;font-size: 12pt;">{{item.title}}</v-card-title>
        <v-card-text>
          <v-expansion-panels
            v-model="panel"
            flat
          >
            <v-expansion-panel>
              <v-expansion-panel-header>
                {{item.subtitle}}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <slot></slot>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
      <v-card class="crd-footer my-5">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-subheader>Menampilkan {{tableData.items.length}} dari total {{tableData.meta.totalItems}} data</v-subheader>
            </v-col>
            <v-col cols="12" md="8">
              <div>
                <v-pagination
                  v-model="filter.pageNumber"
                  :length="tableData.meta.totalPage"
                  :total-visible="7"
                ></v-pagination>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>
<script>
import { PAGE_SIZE } from "~/constants/global";
export default {
  props: {
    title: {
      type: String,
    },
    defaultSortBy: {
      type: String,
    },
    searchTitle: {
      type: String,
    },
    tableData: {
      type: Object,
      default: {
        items: [],
        meta: {
          totalItems: 0,
        },
      },
    },
    headers: {
      type: Array,
      default: [],
    },
    itemFilter: {
      type: Array,
      default: () => [],
    },
    labelFilter: {
      type: String,
      default: () => "Filter",
    },
  },
  data() {
    return {
      itemsPerPage: PAGE_SIZE,
      footerProps: { "items-per-page-options": [10, 20, 40, 50] },
      sortBy: [this.defaultSortBy],
      sortDesc: [false],
      filter: {
        q: "",
        pageSize: this.itemsPerPage,
        pageNumber: 1,
        sortBy: this.defaultSortBy,
        sortType: "asc",
        filterBy: "",
      },
    };
  },
  methods: {
    handleApplyFilter() {
      const filter = Object.assign({}, this.filter);
      this.filter = {
        q: filter.q,
        pageSize: this.itemsPerPage,
        pageNumber: 1,
        sortBy: this.sortBy[0],
        sortType: this.sortDesc[0] == true ? "desc" : "asc",
        filterBy: filter.filterBy,
        t: Date.now(),
      };
      this.$router.replace({
        path: this.$route.path,
        query: this.filter,
      });
    },
    handleRefreshItems() {
      const resetFilter = Object.assign({}, this.filter);
      resetFilter.q = "";
      resetFilter.pageNumber = 1;
      (resetFilter.t = Date.now()), (this.filter = resetFilter);
      this.handleApplyFilter();
    },
    handleAddItem() {
      this.$emit("addItem");
    },
    handleEditItem(item) {
      // copy item to a before edit
      let a = JSON.parse(JSON.stringify(item));

      this.$emit("editItem", a);
    },
    deleteItem(item) {
      this.$emit("deleteItem", item);
    },
    handlePageChanged(page) {
      this.filter.pageNumber = page;
      this.$router.replace({
        path: this.$route.path,
        query: this.filter,
      });
    },
    updateFilterQuery(query) {
      const filter = Object.assign(this.filter, query);
      filter.pageNumber = parseInt(filter.pageNumber);
      filter.pageSize = parseInt(
        filter.pageSize ? filter.pageSize : this.itemsPerPage
      );
      filter.t = Date.now();
      return filter;
    },
    async handleClear() {
      await this.handleResetFilter();
      this.filter.t = Date.now();
      this.$router.replace({
        path: this.$route.path,
        query: this.filter,
      });
    },
    handleResetFilter() {
      this.filter = {
        pageNumber: 1,
        pageSize: this.itemsPerPage,
        q: "",
        sortBy: `${this.defaultSortBy} ,asc`,
        filterBy: "",
        t: Date.now(),
      };
    },
    handleSort() {
      if (this.sortBy.length > 0 && this.sortDesc.length > 0) {
        this.filter.sortBy = this.sortBy[0];
        this.filter.sortType = this.sortDesc[0] == true ? "desc" : "asc";
        this.$router.replace({
          path: this.$route.path,
          query: this.filter,
        });
      }
    },
    getItemPerPage(val) {
      this.itemsPerPage = +val;
      this.filter.pageSize = this.itemsPerPage;
      this.$router.replace({
        path: this.$route.path,
        query: this.filter,
      });
    },
  },
  watch: {
    "$route.query": {
      handler(query) {
        this.filter = this.updateFilterQuery(query);
        this.$emit("fetchData");
      },
      immediate: true,
    },
    sortBy() {
      this.handleSort();
    },
    sortDesc() {
      this.handleSort();
    },
  },
};
</script>
