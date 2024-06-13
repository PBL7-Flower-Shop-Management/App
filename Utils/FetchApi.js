import { API_URL } from "./constants";

export const FetchApi = async (
    endpoint,
    httpType,
    token,
    body,
    hasFormData = false
) => {
    return await fetch(API_URL + endpoint, {
        method: httpType,
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: hasFormData
            ? {
                  Authorization: "Bearer " + token,
              }
            : {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
              },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: hasFormData ? body : JSON.stringify(body),
    })
        .then(async (res) => {
            let response = {};
            if (res.status !== 204) {
                response = await res.json();
            }
            response.succeeded = res.ok;

            return response;
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
            return { succeeded: false, message: error.message ?? error };
        });
};
