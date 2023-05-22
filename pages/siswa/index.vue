<template>
  <div>
    <TableListSiswa
      :headers="headers"
      :tableData="data"
      defaultSortBy="createdAt"
      title="Data Siswa"
      searchTitle="Cari Siswa"
      @fetchData="loadAll"
      @addItem="addItem"
      @editItem="editItem"
      @deleteItem="deleteItem"
    >
    </TableListSiswa>

    <!-- Dialog Form -->
    <v-dialog v-model="dialog" scrollable max-width="600px" persistent>
      <v-card>
        <v-card-title
          style="color: green; padding-top: 12px; padding-bottom: 12px"
        >
          <span style="font-size: 20px; padding-right: 10px">{{
            formTitle
          }}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="handleClose()" style="color: white">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form
            onSubmit="return false"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="editedItem.nama"
              label="Nama"
              :rules="[(v) => !!v || 'Nama harus diisi']"
              required
            ></v-text-field>
            <v-text-field
              v-model="editedItem.kelas"
              label="Kelas"
              :rules="[(v) => !!v || 'Kelas harus diisi']"
              required
            ></v-text-field>
            <v-autocomplete
              v-model="editedItem.idKelas"
              label="Kelas"
              :rules="[(v) => !!v || 'Kelas harus diisi']"
              :items="listKelas"
              item-value="id"
              item-text="nama"
              clearable
            ></v-autocomplete>
            <v-file-input
              v-model="editedItem.berkas"
              label="File input"
              prepend-icon=""
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-3">
          <v-spacer></v-spacer>
          <v-btn class="error" @click="handleClose()"> Batal </v-btn>
          <v-btn class="success" @click="handleSave()"> Simpan </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" src="./siswa.component.ts"></script>
