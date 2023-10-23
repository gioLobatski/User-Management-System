<script>
import { ref } from "vue";
import {
  tableData,
  getUserData,
  updateData,
  deleteData,
  resetValidation,
  requiredInput,
  deleteBtnLoadingState,
  btnLoadingState,
} from "../composables/System";

let selectedRow = ref({});
let rows = ref([]);
let currentDialogForm = ref(1);
let dialogData = ref({
  name: null,
  username: null,
  email: null,
  address: {
    street: null,
    suite: null,
    city: null,
    zipcode: null,
    geo: {
      lat: null,
      lng: null,
    },
  },
  phone: null,
  website: null,
  company: {
    name: null,
    catchPhrase: null,
    bs: null,
  },
});

let showEditDialog = ref(false);
let showDeleteDialog = ref(false);

export default {
  setup() {
    let columns = ref([
      {
        name: "id",
        label: "ID",
        align: "center",
        field: "id",
      },
      {
        name: "name",
        label: "NAME",
        align: "left",
        field: "name",
      },
      {
        name: "username",
        label: "USERNAME",
        align: "left",
        field: "username",
      },
      {
        name: "email",
        label: "EMAIL",
        align: "left",
        field: "email",
      },
      {
        name: "address",
        label: "ADDRESS",
        align: "left",
        field: "address",
      },
      {
        name: "latitude",
        label: "LATITUDE",
        align: "left",
        field: "latitude",
      },
      {
        name: "longitude",
        label: "LONGITUDE",
        align: "left",
        field: "longitude",
      },
      {
        name: "phone",
        label: "PHONE No.",
        align: "left",
        field: "phone",
      },
      {
        name: "website",
        label: "WEBSITE",
        align: "left",
        field: "website",
      },
      {
        name: "company",
        label: "COMPANY",
        align: "left",
        field: "company",
      },
      {
        name: "catchPhrase",
        label: "CATCHPHRASE",
        align: "center",
        field: "catchPhrase",
      },
      {
        name: "bs",
        label: "BS",
        align: "center",
        field: "bs",
      },
      {
        name: "action",
        label: "ACTION",
        align: "center",
        field: "action",
      },
    ]);

    let sliceAddress = (address) => {
      const parts = address
        .split(/[,()]/)
        .map((part) => part.trim())
        .filter((part) => part.length > 0);
      return parts;
    };

    const toggleEditDialog = (row) => {
      selectedRow.value = row;
      dialogData.value.name = row.name;
      dialogData.value.username = row.username;
      dialogData.value.email = row.email;
      dialogData.value.phone = row.phone;
      dialogData.value.website = row.website;

      let slicedAddress = sliceAddress(row.address);
      dialogData.value.address.street = slicedAddress[0];
      dialogData.value.address.suite = slicedAddress[1];
      dialogData.value.address.city = slicedAddress[2];
      dialogData.value.address.zipcode = slicedAddress[3];
      dialogData.value.address.geo.lat = row.latitude;
      dialogData.value.address.geo.lng = row.longitude;
      dialogData.value.company.name = row.company;
      dialogData.value.company.catchPhrase = row.catchPhrase;
      dialogData.value.company.bs = row.bs;
      showEditDialog.value = true;
    };

    const toggleDeleteDialog = (row) => {
      selectedRow.value = row;
      showDeleteDialog.value = true;
    };

    return {
      rows,
      columns,
      getUserData,
      tableData,
      showEditDialog,
      toggleEditDialog,
      dialogData,
      currentDialogForm,
      sliceAddress,
      updateData,
      toggleDeleteDialog,
      showDeleteDialog,
      deleteData,
      resetValidation,
      requiredInput,
      deleteBtnLoadingState,
      btnLoadingState,
    };
  },
};

export {
  rows,
  dialogData,
  selectedRow,
  currentDialogForm,
  deleteData,
  showEditDialog,
  showDeleteDialog,
};
</script>

<template>
  <q-page class="flex flex-center">
    <q-table
      title="USERS"
      style="width: 1000px; height: 550px"
      :rows="rows"
      :columns="columns"
      row-key="name"
      virtual-scroll
      :rows-per-page-options="[0]"
    >
      <template #body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props"> {{ props.row.id }}</q-td>
          <q-td key="name" :props="props"> {{ props.row.name }}</q-td>
          <q-td key="username" :props="props"> {{ props.row.username }}</q-td>
          <q-td key="email" :props="props"> {{ props.row.email }}</q-td>
          <q-td key="address" :props="props"> {{ props.row.address }}</q-td>
          <q-td key="latitude" :props="props"> {{ props.row.latitude }}</q-td>
          <q-td key="longitude" :props="props"> {{ props.row.longitude }}</q-td>
          <q-td key="phone" :props="props"> {{ props.row.phone }}</q-td>
          <q-td key="website" :props="props"> {{ props.row.website }}</q-td>
          <q-td key="company" :props="props"> {{ props.row.company }}</q-td>
          <q-td key="catchPhrase" :props="props">
            {{ props.row.catchPhrase }}</q-td
          >
          <q-td key="bs" :props="props"> {{ props.row.bs }}</q-td>
          <q-td key="action" :props="props">
            <q-btn
              flat
              round
              color="primary"
              icon="edit"
              dense
              @click="toggleEditDialog(props.row)"
            />
            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              dense
              @click="toggleDeleteDialog(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="showEditDialog" persistent>
      <q-card>
        <q-form
          ref="resetValidation"
          v-if="currentDialogForm === 1"
          class="q-ma-lg"
        >
          <h6 class="text-center q-ma-md">USER FORM</h6>
          <q-input
            rounded
            outlined
            label="Name"
            v-model="dialogData.name"
            style="width: 230px"
            lazy-rule
            dense
            :rules="[requiredInput()]"
          >
          </q-input>
          <q-input
            rounded
            outlined
            label="Username"
            v-model="dialogData.username"
            style="width: 230px"
            lazy-rule
            dense
            bottom-slots
            :rules="[requiredInput()]"
          >
          </q-input>
          <q-input
            rounded
            outlined
            v-model="dialogData.email"
            label="Email"
            style="width: 230px"
            type="email"
            lazy-rule
            dense
            bottom-slots
            :rules="[requiredInput()]"
          >
          </q-input>
          <q-input
            rounded
            outlined
            v-model="dialogData.phone"
            label="Phone Number"
            style="width: 230px"
            lazy-rule
            dense
            bottom-slots
            :rules="[requiredInput()]"
          >
          </q-input>
          <q-input
            rounded
            outlined
            label="Website"
            v-model="dialogData.website"
            style="width: 230px"
            lazy-rule
            dense
            bottom-slots
            :rules="[requiredInput()]"
          >
          </q-input>
          <div class="text-right q-ma-sm">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn
              label="Next"
              color="primary"
              rounded
              style="width: 80px"
              push
              @click="currentDialogForm = 2"
            />
          </div>
        </q-form>
        <q-form
          ref="resetValidation"
          v-if="currentDialogForm === 2"
          class="q-ma-lg"
        >
          <h6 class="text-center q-ma-md">COMPLETE ADDRESS</h6>

          <q-input
            rounded
            outlined
            v-model="dialogData.address.street"
            label="Street"
            style="width: 230px"
            lazy-rule
            dense
            bottom-slots
            :rules="[requiredInput()]"
          >
          </q-input>
          <q-input
            rounded
            outlined
            v-model="dialogData.address.suite"
            label="Suite"
            style="width: 230px"
            lazy-rule
            dense
            bottom-slots
            :rules="[requiredInput()]"
          >
          </q-input>
          <q-input
            rounded
            outlined
            v-model="dialogData.address.city"
            label="City"
            style="width: 230px"
            lazy-rule
            dense
            bottom-slots
            :rules="[requiredInput()]"
          >
          </q-input>
          <q-input
            rounded
            outlined
            v-model="dialogData.address.zipcode"
            label="Zip Code"
            type="number"
            style="width: 230px"
            lazy-rule
            dense
            bottom-slots
            :rules="[requiredInput()]"
          >
          </q-input>
          <q-input
            rounded
            outlined
            type="number"
            v-model="dialogData.address.geo.lat"
            label="Latitude"
            style="width: 230px"
            lazy-rule
            dense
            bottom-slots
            :rules="[requiredInput()]"
          >
          </q-input>
          <q-input
            rounded
            outlined
            type="number"
            v-model="dialogData.address.geo.lng"
            label="Longitude"
            style="width: 230px"
            lazy-rule
            dense
            bottom-slots
            :rules="[requiredInput()]"
          >
          </q-input>
          <div class="text-right">
            <q-btn
              label="Back"
              color="primary"
              flat
              rounded
              style="width: 80px; margin-right: 10px"
              push
              @click="currentDialogForm = 1"
            />
            <q-btn
              label="Next"
              color="primary"
              rounded
              style="width: 80px"
              push
              @click="currentDialogForm = 3"
            />
          </div>
        </q-form>
        <q-form
          ref="resetValidation"
          v-if="currentDialogForm === 3"
          class="q-ma-lg"
        >
          <h6 class="text-center q-ma-md">COMPANY</h6>
          <q-input
            rounded
            outlined
            v-model="dialogData.company.name"
            label="Company Name"
            style="width: 230px"
            lazy-rule
            dense
            bottom-slots
            :rules="[requiredInput()]"
          >
          </q-input>
          <q-input
            rounded
            outlined
            v-model="dialogData.company.catchPhrase"
            label="Catch Phrase"
            style="width: 230px"
            lazy-rule
            dense
            bottom-slots
            :rules="[requiredInput()]"
          >
          </q-input>
          <q-input
            rounded
            outlined
            v-model="dialogData.company.bs"
            label="BS"
            style="width: 230px"
            lazy-rule
            dense
            bottom-slots
            :rules="[requiredInput()]"
          >
          </q-input>
          <div class="text-right">
            <q-btn
              flat
              label="Back"
              color="primary"
              style="width: 80px; margin-right: 10px"
              push
              @click="currentDialogForm = 2"
            />
            <q-btn
              label="UPDATE"
              color="primary"
              rounded
              style="width: 80px"
              push
              :loading="btnLoadingState"
              @click="updateData()"
            />
          </div>
        </q-form>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showDeleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="q-ml-sm">Are you sure you want to delete?</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="CANCEL" color="primary" v-close-popup />
          <q-btn
            label="YES"
            rounded
            :loading="deleteBtnLoadingState"
            color="primary"
            @click="deleteData()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style>
#text-size-18 {
  font-size: 18px;
}
</style>
