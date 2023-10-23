import { ref } from "vue";
import axios from "axios";
import {
  rows,
  dialogData,
  selectedRow,
  currentDialogForm,
  showEditDialog,
  showDeleteDialog,
} from "../pages/UserList";
import { form, currentForm } from "../pages/AddUsers";

let tableData = ref([]);
let btnLoadingState = ref(false);
let resetValidation = ref(null);
let btnUserFormState = ref(true);
let btnAddressState = ref(true);
let btnCompanyState = ref(true);
let requiredInputState = ref(false);
let validateEmailState = ref(false);
let validateWebsiteState = ref(false);
let validateUsernameState = ref(false);
let validateLatLngState = ref(true);

const getUserData = () => {
  axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
    tableData.value = response.data.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      address: `${user.address.street}, ${user.address.suite}, ${user.address.city} (${user.address.zipcode})`,
      latitude: user.address.geo.lat,
      longitude: user.address.geo.lng,
      phone: user.phone,
      website: user.website,
      company: user.company.name,
      catchPhrase: user.company.catchPhrase,
      bs: user.company.bs,
    }));
    rows.value = tableData.value;
  });
};

getUserData();

const toCapitalize = (words) => {
  const word = words.toLowerCase().split(" ");

  for (var i = 0; i < word.length; i++) {
    word[i] = word[i].charAt(0).toUpperCase() + word[i].slice(1);
  }

  const combinedWord = word.join(" ");
  return combinedWord;
};

const addUserData = () => {
  btnLoadingState.value = true;
  let tableLength = tableData.value.length;

  axios
    .post("https://jsonplaceholder.typicode.com/users", form.value)
    .then((response) => {
      if (response.status === 201) {
        // use .push() method to add data at the last row.
        tableData.value.unshift({
          id: ++tableLength,
          name: toCapitalize(response.data.name),
          username: response.data.username,
          email: response.data.email,
          address: toCapitalize(
            `${response.data.address.street}, ${response.data.address.suite}, ${response.data.address.city} (${response.data.address.zipcode})`
          ),
          latitude: response.data.address.geo.lat,
          longitude: response.data.address.geo.lng,
          phone: response.data.phone,
          website: response.data.website,
          company: response.data.company.name,
          catchPhrase: response.data.company.catchPhrase,
          bs: response.data.company.bs,
        });

        form.value.name = null;
        form.value.username = null;
        form.value.email = null;
        form.value.address.street = null;
        form.value.address.suite = null;
        form.value.address.city = null;
        form.value.address.zipcode = null;
        form.value.address.geo.lat = null;
        form.value.address.geo.lng = null;
        form.value.phone = null;
        form.value.website = null;
        form.value.company.name = null;
        form.value.company.catchPhrase = null;
        form.value.company.bs = null;
        currentForm.value = 1;
        resetValidation.value.reset();
      }
      btnLoadingState.value = false;
    });
};

const updateData = () => {
  btnLoadingState.value = true;
  axios
    .patch(
      `https://jsonplaceholder.typicode.com/users/${selectedRow.value.id}`,
      dialogData.value
    )
    .then((response) => {
      if (response.status === 200) {
        let index = tableData.value.findIndex(
          (row) => row.id === selectedRow.value.id
        );

        tableData.value[index].name = toCapitalize(response.data.name);
        tableData.value[index].username = response.data.username;
        tableData.value[index].email = response.data.email;
        tableData.value[index].address = toCapitalize(
          `${response.data.address.street}, ${response.data.address.suite}, ${response.data.address.city} (${response.data.address.zipcode})`
        );
        tableData.value[index].latitude = response.data.address.geo.lat;
        tableData.value[index].longitude = response.data.address.geo.lng;
        tableData.value[index].phone = response.data.phone;
        tableData.value[index].website = response.data.website;
        tableData.value[index].company = response.data.company.name;
        tableData.value[index].catchPhrase = response.data.company.catchPhrase;
        tableData.value[index].bs = response.data.company.bs;

        selectedRow.value = {};
        currentDialogForm.value = 1;
      }
      showEditDialog.value = false;
      btnLoadingState.value = false;
    });
};

let deleteBtnLoadingState = ref(false);
const deleteData = () => {
  deleteBtnLoadingState.value = true;
  axios
    .delete(
      `https://jsonplaceholder.typicode.com/users/${selectedRow.value.id}`
    )
    .then((response) => {
      if (response.status === 200) {
        let index = tableData.value.findIndex(
          (row) => row.id === selectedRow.value.id
        );
        index !== -1 && tableData.value.splice(index, 1);
      }
      showDeleteDialog.value = false;
      deleteBtnLoadingState.value = false;
    });
};

const userFormValidation = () => {
  if (
    requiredInputState.value == true &&
    validateEmailState.value == true &&
    validateWebsiteState.value == true &&
    validateUsernameState.value == true
  ) {
    btnUserFormState.value = false;
  } else {
    btnUserFormState.value = true;
  }
};

const addressValidation = () => {
  if (requiredInputState.value == true && validateLatLngState.value == true) {
    btnAddressState.value = false;
  } else {
    btnAddressState.value = true;
  }
};

const companyValidation = () => {
  if (requiredInputState.value == true) {
    btnCompanyState.value = false;
  } else {
    btnCompanyState.value = true;
  }
};

const requiredInput = () => (val) => {
  if (!!val) {
    requiredInputState.value = true;
    userFormValidation();
    addressValidation();
    companyValidation();
    return true;
  } else {
    requiredInputState.value = false;
    userFormValidation();
    addressValidation();
    companyValidation();
    return "Field is required";
  }
};

export {
  tableData,
  getUserData,
  addUserData,
  updateData,
  deleteData,
  resetValidation,
  requiredInput,
  userFormValidation,
  btnUserFormState,
  btnAddressState,
  btnCompanyState,
  deleteBtnLoadingState,
  btnLoadingState,
};
