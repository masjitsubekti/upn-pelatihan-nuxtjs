<template>
  <div>
    <TableList
      :headers="headers"
      :tableData="data"
      defaultSortBy="createdAt"
      title="Jenis Mitra"
      searchTitle="Cari Jenis Mitra"
      @fetchData="loadAll"
      @addItem="addItem"
      @editItem="editItem"
      @deleteItem="deleteItem"
    >
    </TableList>

    <v-dialog v-model="dialog" scrollable max-width="600px">
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
            <v-container>
              <v-layout>
                <v-flex xs12 sm12 md12>
                  <v-row class="mt-1">
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="editedItem.namaJenisMitra"
                        label="Nama Jenis Mitra"
                        outlined
                        dense
                        color="green"
                        hide-details="auto"
                        :rules="[(v) => !!v || 'Nama Jenis Mitra harus diisi']"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="pa-1">
            <v-btn depressed color="error" outlined @click.prevent="handleClose()">
              BATAL
            </v-btn>
            <v-btn depressed color="success" outlined @click.prevent="handleSave()">
              SIMPAN
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" src="./jenis_mitra.component.ts"></script>
