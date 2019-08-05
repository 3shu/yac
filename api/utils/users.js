class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, nickname, room) {
        var user = { id, nickname, room};
        //console.log(user);
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);

        if(user){
            this.users = this.users.filter(user => user.id !== id);
        }

        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArr = users.map(user => user.nickname);
        return namesArr
    }

    noDuplicUser(nickname,room) {
        var usersroom = this.users.filter((user) => user.room === room);
        if (usersroom.length > 0) {
            var user = this.users.filter((user) => user.nickname === nickname);
            if (user.length > 0) {
                return false;
            }else{
                return true;
            }
        }else{
            return true;
        }
    }

}

module.exports = { Users }