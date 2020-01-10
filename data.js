export default {
  async getUsersData() {
    const response = await fetch('http://localhost:3000/users')
    return response.json();
  },
  async deleteUser(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE"
    })
  },
  async putUserInfo(userId, patchData) {
    await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patchData)
    })
  },
  async createUser(data) {
    await fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
}