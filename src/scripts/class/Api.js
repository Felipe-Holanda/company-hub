import { Notify } from "./Notify.js";

export class Api {
    static token = localStorage.getItem("@KenzieEmpresas-M2:token");
    static headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
    }

    static async loginPages(data) {
        const authLogin = await fetch(`http://localhost:6278/auth/login`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.token == 'undefined' && res.uuid == 'undefined' && res.error) {
                    Notify.now(false, 5000, 'Usuário ou senha incorretos');
                } else {
                    localStorage.setItem("@KenzieEmpresas-M2:token", res.token)
                    localStorage.setItem("@KenzieEmpresas-M2:admin", res.is_admin)
                    localStorage.setItem("@KenzieEmpresas-M2:uiid", res.uuid)
                    Notify.now(true, 5000, "Login efetuado com sucesso! Você está sendo redirecionado")
                    setTimeout(() => {
                        window.location.href = "/dashboard.html"
                    }, 4000)
                }
                return res
            })
            .catch(err => Notify.now(false, 5000, err))
        return authLogin;
    }

    static async newRegister(data) {
        const userRegister = await fetch(`http://localhost:6278/auth/register/user  `, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(resp => {
                if (resp.ok) {
                    Notify.now(true, 5000, "Usuário cadastrado com sucesso!")
                } else {
                    Notify.now(false, 5000, resp.error)
                }
            })
            .catch(err => Notify.now(false, 5000, err))
        return userRegister
    }

    static async registerComps(reqsts) {
        const registerComps = await fetch(`http://localhost:6278/companies`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(reqsts)
        })
            .then(res => res.json())
            .then(resp => resp)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))
        return registerComps
    }

    static async editData(data) {
        const editedData = await fetch(`http://localhost:6278/users`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(resp => resp)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))

        Notify.now(true, 5000, "Dados alterados com sucesso!")
        return editedData
    }

    static async listedComp() {
        const listedCompanys = await fetch(`http://localhost:6278/companies`, {
            method: "GET",
            headers: this.headers
        })
            .then(res => res.json())
            .then(res => res)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))
        return listedCompanys
    }

    static async hire(hire) {
        const hireUser = await fetch(`http://localhost:6278/departments/hire/`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(hire)
        })
            .then(res => res.json())
            .then(res => res)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))
        return hireUser
    }

    static async dismiss(uuid) {
        const dimissUser = await fetch(`http://localhost:6278/departments/dismiss/${uuid}`, {
            method: "PATCH",
            headers: this.headers,
        })
            .then(res => res.json())
            .then(res => res)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))
        return dimissUser
    }

    static async listDepartments(uuid) {
        const listDepartments = await fetch(`http://localhost:6278/departments/${uuid}`, {
            method: "GET",
            headers: this.headers,
        })
            .then(res => res.json())
            .then(res => res)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))
        return listDepartments
    }

    static async editedDepartament(id, body) {
        const editedDeprt = await fetch(`http://localhost:6278/departments/${id}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => res)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))
        return editedDeprt
    }

    static async deletedDepartament(uuid) {
        const deletedDeprt = await fetch(`http://localhost:6278/departments/${uuid}`, {
            method: "DELETE",
            headers: this.headers,
        })
            .then(res => res.json())
            .then(res => res)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))
        return deletedDeprt
    }

    static async editedData(uuid, data) {
        const editedUser = await fetch(`http://localhost:6278/admin/update_user/${uuid}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => res)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))
        return editedUser
    }
    static async listedSectors() {
        const listSectors = await fetch(`http://localhost:6278/sectors`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then(resp => resp)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))
        return listSectors
    }

    static async listedDepartament() {
        const departament = await fetch(`http://localhost:6278/departments`, {
            method: "GET",
            headers: this.headers
        })
            .then((res) => res.json())
            .then(res => res)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))
        return departament
    }

    static async profile() {
        const profile = await fetch(`http://localhost:6278/users/profile`, {
            method: "GET",
            headers: this.headers
        })
            .then(res => res.json())
            .then(res => res)
            .catch(err => Notify.now(false, 5000, `API Error: ${err}`))
        return profile
    }

    static async userOnDepartament() {
        const userDepart = await fetch(`http://localhost:6278/users/departments`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then(res => res)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))
        return userDepart
    }

    static async userDepartamentWork() {
        const coworkers = await fetch(`http://localhost:6278/users/departments/coworkers`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then(res => res)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))
        return coworkers
    }

    static async sectorsCompany(uuid) {
        const allSectors = await fetch(`http://localhost:6278/companies/${uuid}`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then(res => res)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))
        return allSectors
    }

    static async departmentCreate(body) {
        const department = await fetch(`http://localhost:6278/departments`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then(res => res)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))
        return department
    }

    static async departamentCompany() {
        const departCompanys = await fetch(`http://localhost:6278/departments/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then(res => res)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))
        return departCompanys
    }

    static async listedUsers() {
        const allUsers = await fetch(`http://localhost:6278/users`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then(res => res)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))
        return allUsers
    }

    static async userOfWork() {
        const outWork = await fetch(`http://localhost:6278/admin/out_of_work`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then(res => res)
            .catch(err => Notify.now(false, 5000, `API: ${err}`))
        return outWork
    }

    static async fired(uuid) {
        const fired = await fetch(`http://localhost:6278/admin/delete_user/${uuid}`, {
            method: "DELETE",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then(res => res)
            .catch(err => Notify.now(false, 0, `API: ${err}`))
        return fired
    }
}
