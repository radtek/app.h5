import Form from "./form.vue";
import FormItem from "./form-item.vue";

Form.install = function(Vue) {
	Vue.component(Form.name, Form);
};

FormItem.install = function(Vue) {
	Vue.component(FormItem.name, FormItem);
};

Form.Item = FormItem;

export default Form;
