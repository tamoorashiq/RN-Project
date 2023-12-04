import { useSelector } from "react-redux"
const useFetch = () => {
  const user = useSelector(state => state.userReducer.user)
  console.log(user?.key, "user?.key")
  const request = (url, method = "GET", body, contentType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = {
          "Content-Type": contentType || "application/json"
        }
        const access_token = user?.key
        // console.log(access_token, "access_token")
        if (access_token) {
          headers["Authorization"] = "Token " + access_token
        }

        const dataObj = {
          method,
          headers
        }

        if (body) {
          dataObj["body"] =
            typeof body == "string" ? body : JSON.stringify(body)
        }

        // console.log(contentType, "contentType")
        const response = await fetch(url, dataObj)
        if (response.ok) {
          // if HTTP-status is 200-299
          // get the response body (the method explained below)
          // console.log(response, "response")
          // const json = await response.json()
          let json
          if (method === "DELETE") {
            json = null
          } else {
            json = await response.json()
          }
          resolve({ status: 200, data: json })
        } else {
          const status = response.status
          const error = await response.json()
          reject({ status, error })
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  const fileRequest = (url, method = "GET", body, contentType) => {
    return new Promise(async (resolve, reject) => {
      try {
        var headers = new Headers()
        const access_token = localStorage.getItem("@access_token")

        if (access_token) {
          headers.append("Authorization", "Token " + access_token)
        }
        const dataObj = {
          method,
          headers
        }

        if (body) {
          dataObj["body"] = body
        }

        const response = await fetch(url, dataObj)
        if (response.ok) {
          // if HTTP-status is 200-299
          // get the response body (the method explained below)
          const json = await response.json()
          console.log(json, "response JSON")
          resolve({ status: 200, data: json })
        } else {
          const status = response.status
          const error = await response.json()
          reject({ status, error })
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  return { request, fileRequest }
}

export default useFetch
