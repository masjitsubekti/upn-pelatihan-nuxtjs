<template>
  <div>
    <TableList
      :headers="headers"
      :tableData="data"
      defaultSortBy="createdAt"
      title="Data Pendaftaran Mbkm"
      searchTitle="Cari Data"
      @fetchData="loadAll"
      @addItem="addItem"
      @editItem="editItem"
      @deleteItem="deleteItem"
    >
    </TableList>
  </div>
</template>

<script lang="ts" src="./pendaftar_mbkm.component.ts"></script>
