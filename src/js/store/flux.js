const url = "https://assets.breatheco.de/apis/fake/contact/";
const getState = ({ getStore, setStore }) => {
	return {
		store: {
			contacs: []
		},
		actions: {
			loadContact() {
				fetch(url + "agenda/the_plug")
					.then(response => response.json())
					.then(result => {
						console.log("Get Contact", result), setStore({ contacts: result });
					})
					.catch(e => console.error(e));
			},
			addContact(name, phone, email, address) {
				fetch(url, {
					method: "post",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({
						full_name: name,
						phone: phone,
						address: address,
						email: email,
						agenda_slug: "the_plug"
					})
				}).then(() => {
					fetch(url + "agenda/the_plug")
						.then(response => response.json())
						.then(result => {
							console.log("result", result),
								setStore({
									contacts: result
								});
						})
						.catch(e => console.error(e));
				});
			},
			editContact(id, name, phone, email, address) {
				fetch(url + id, {
					method: "put",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({
						full_name: name,
						phone: phone,
						address: address,
						email: email,
						agenda_slug: "the_plug"
					})
				}).then(() => {
					fetch(url + "agenda/the_plug")
						.then(response => response.json())
						.then(result => {
							console.log("result", result),
								setStore({
									contacts: result
								});
						})
						.catch(e => console.error(e));
				});
			},
			deleteContact(id) {
				fetch(url + id, {
					method: "delete"
				}).then(() => {
					fetch(url + "agenda/the_plug")
						.then(response => response.json())
						.then(result => {
							console.log("result", result),
								setStore({
									contacts: result
								});
						})
						.catch(e => console.error(e));
				});
			}
		}
	};
};

export default getState;
