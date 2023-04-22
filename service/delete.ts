import { axiosFileAPI } from "./axios"

const deleteLink = async (fileId: string) => {
    const response = await axiosFileAPI.delete(`/${fileId}`)
    return response.data
}

export {deleteLink}