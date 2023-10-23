<script>
import { ref } from "vue";
import {
  addUserData,
  resetValidation,
  requiredInput,
  userFormValidation,
  btnUserFormState,
  btnAddressState,
  btnLoadingState,
  btnCompanyState,
} from "../composables/System";

let form = ref({
  id: null,
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

let currentForm = ref(1);
export default {
  setup() {
    return {
      resetValidation,
      form,
      currentForm,
      addUserData,
      requiredInput,
      btnUserFormState,
      userFormValidation,
      btnLoadingState,
      btnAddressState,
      btnCompanyState,
    };
  },
};

export { form, currentForm };
</script>

<template>
  <q-page>
    <div class="q-pa-md q-ma-sm form-container">
      <q-form ref="resetValidation" v-if="currentForm === 1" class="q-ma-xl">
        <h2 class="text-h2 text-size-18 text-center text-weight-bold q-ma-none">
          USER FORM
        </h2>
        <q-input
          class="col"
          v-model="form.name"
          label="Name"
          lazy-rule
          dense
          :rules="[requiredInput()]"
        >
        </q-input>
        <q-input
          class="col"
          v-model="form.username"
          label="Username"
          lazy-rule
          dense
          bottom-slots
          :rules="[requiredInput()]"
        >
        </q-input>
        <q-input
          class="col"
          v-model="form.email"
          label="Email"
          lazy-rule
          type="email"
          dense
          bottom-slots
          :rules="[requiredInput()]"
        >
        </q-input>
        <q-input
          class="col"
          v-model="form.phone"
          label="Phone Number"
          lazy-rule
          dense
          bottom-slots
          :rules="[requiredInput()]"
        >
        </q-input>
        <q-input
          class="col"
          v-model="form.website"
          label="Website"
          lazy-rule
          dense
          bottom-slots
          :rules="[requiredInput()]"
        >
        </q-input>
        <div class="text-right">
          <q-btn
            label="Next"
            color="primary"
            style="width: 80px"
            push
            @click="currentForm = 2"
          />
        </div>
      </q-form>
      <q-form ref="resetValidation" v-if="currentForm === 2" class="q-ma-xl">
        <h2 class="text-h2 text-size-18 text-center text-weight-bold q-ma-none">
          COMPLETE ADDRESS
        </h2>

        <q-input
          class="col"
          v-model="form.address.street"
          label="Street"
          lazy-rule
          dense
          bottom-slots
          :rules="[requiredInput()]"
        >
        </q-input>
        <q-input
          class="col"
          v-model="form.address.suite"
          label="Suite"
          lazy-rule
          dense
          bottom-slots
          :rules="[requiredInput()]"
        >
        </q-input>
        <q-input
          class="col"
          v-model="form.address.city"
          label="City"
          lazy-rule
          dense
          bottom-slots
          :rules="[requiredInput()]"
        >
        </q-input>
        <q-input
          class="col"
          type="number"
          v-model="form.address.zipcode"
          label="Zip Code"
          lazy-rule
          dense
          bottom-slots
          :rules="[requiredInput()]"
        >
        </q-input>
        <q-input
          class="col"
          v-model="form.address.geo.lat"
          label="Latitude"
          type="number"
          lazy-rule
          dense
          bottom-slots
          :rules="[requiredInput()]"
        >
        </q-input>
        <q-input
          class="col"
          type="number"
          v-model="form.address.geo.lng"
          label="Longitude"
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
            style="width: 80px; margin-right: 10px"
            push
            @click="currentForm = 1"
          />
          <q-btn
            label="Next"
            color="primary"
            style="width: 80px"
            push
            @click="currentForm = 3"
          />
        </div>
      </q-form>
      <q-form ref="resetValidation" v-if="currentForm === 3" class="q-ma-xl">
        <h2 class="text-h2 text-size-18 text-center text-weight-bold q-ma-none">
          COMPANY BACKGROUND
        </h2>
        <q-input
          class="col"
          v-model="form.company.name"
          label="Company Name"
          lazy-rule
          dense
          bottom-slots
          :rules="[requiredInput()]"
        >
        </q-input>
        <q-input
          class="col"
          v-model="form.company.catchPhrase"
          label="Catch Phrase"
          lazy-rule
          dense
          bottom-slots
          :rules="[requiredInput()]"
        >
        </q-input>
        <q-input
          class="col"
          v-model="form.company.bs"
          label="BS"
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
            style="width: 80px; margin-right: 10px"
            push
            @click="currentForm = 2"
          />
          <q-btn
            label="SUBMIT"
            color="primary"
            style="width: 80px"
            push
            @click="addUserData()"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>
