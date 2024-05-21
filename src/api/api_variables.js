import axios from "axios";

// export default axios.create({
//     baseURL: 'https://http://127.0.0.1:8000/'
// });

export const api_root= 'https://env-backend-papicnation-bcfeffef.koyeb.app/'; 
export var bearer_token= null;
export let keep_user_data= [];
export let keep_json_data= [];
export let keep_json_data_tracker= [false];
export let keep_json_data_model= [];
export let keep_json_data_model_tracker= [true];
export let model_images= [];
export let keep_objects_data= [];
export let keep_objects_data_reference= {};
export let keep_objects_reference= [];
export let keep_current_object= [];

export let has_model_loaded= [];

export let save_for_object_view= [];

export let keep_for_edit_name= [];
export let keep_for_edit_url= [];
export let keep_for_view_url= [];
export let keep_for_object_view= {};

export let keep_m_name= [];


export var store_first_json;
export var store_form_data;

export let active = ["Dashboard"];


export let admins_gotten= [];
export function set_admins_gotten(value){
    admins_gotten= value;
}
export let selected_admins= [];
export var selectAllValue= false;
export const setSelectAllValue= (value) => {
    selectAllValue= value;
}




export const reset_on_login= () => {
    bearer_token= null;
    keep_user_data= [];
    keep_json_data= [];
    keep_json_data_tracker= [false];
    keep_json_data_model= [];
    keep_json_data_model_tracker= [false];
    model_images= [];
    keep_objects_data= [];
    keep_objects_data_reference= {};
    keep_objects_reference= [];
    keep_current_object= [];
    has_model_loaded= [];
    save_for_object_view= [];
    keep_for_edit_name= [];
    keep_for_edit_url= [];
    keep_for_view_url= [];
    keep_for_object_view= {};
    keep_m_name= [];
    store_first_json= null;
    store_form_data= null;
    active = ["Dashboard"];
    admins_gotten= [];
    selected_admins= [];
    selectAllValue= false;
}


export const reset_values= () => {
    bearer_token= null;
    keep_json_data= [];
    model_images= [];
    keep_objects_data= [];
    keep_objects_data_reference= {};
    keep_objects_reference= [];
    keep_current_object= [];

    has_model_loaded= [];

    save_for_object_view= [];

    keep_for_edit_name= [];
    keep_for_edit_url= [];
    keep_for_view_url= [];

    keep_m_name= [];


    store_first_json= null;
    store_form_data= null;
}




export class FirstJsonClass {
    constructor(value_gotten) {
      this.value_gotten = value_gotten;
      store_first_json= value_gotten;
    }
  
    // getter
    get name() {
        return this.value_gotten;
    //   return `${this.first} ${this.last}`;
    }

    // 👇️ Define setter
    set name(value_to_set) {
        this.value_gotten = value_to_set;
    }
}



export class FormData_ {
    constructor(value_gotten) {
      this.value_gotten = value_gotten;
      store_form_data= value_gotten;
    }
  
    // getter
    get name() {
        return this.value_gotten;
    //   return `${this.first} ${this.last}`;
    }

    // 👇️ Define setter
    set name(value_to_set) {
        this.value_gotten = value_to_set;
    }
  }



