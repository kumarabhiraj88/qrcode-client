import { useState } from 'react';
import { useDispatch } from 'react-redux';

function useFormValidation(intialState, validate){
	const [values, setValues] = useState(intialState);
	const [errors, setErrors] = useState({});
	const dispatch = useDispatch();

	function handleChange(event, dropdown = false, name = null , file = false, multi = false){
		if (dropdown && !multi) { 
			if (event) {

				setValues({
					...values,
					[name]: event._id
				});
				setErrors({
					...errors,
					[name]: ""
				})

			}
		}
		else if (file) {
			setValues({
				...values,
				[event.target.name]: event.target.files[0],
			});
			setErrors({
				...errors,
				[event.target.name]: "",
			});
		} 
		else { 
			setValues({
					...values,
					[event.target.name]: event.target.value
				});
				setErrors({
					...errors,
					[event.target.name]: ""
				})

		}	

	}

	async function handleSubmit(event, actionCall, toggleModal = () => { }, file = false){
		event.preventDefault();

		const validationData = validate(values);
		if(Object.keys(validationData).length <= 0){
			try { 	
				if (file) { 
					const formData = new FormData();
					Object.keys(values).map((keys) => {
						formData.append([keys], values[keys])
					});
					await actionCall(formData);	
					//toggleModal();
				}else {
					await actionCall(values);
				    toggleModal();
				}

			}
			catch(error){
				throw error;
			}
			
		}
		setErrors(validationData);
		
	}



	return{
		handleSubmit,
		handleChange,
		values,
		errors
	}

}


export default useFormValidation;