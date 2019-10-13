/**
 * Created by n.fajar 10/08/2019.
 */

/** Get index dari item berdasarkan id */
Array.prototype.getIndexById = function (id) {
    // Implementasi findIndex dari bawaan array
    return this.findIndex(function (item) {
        // Dengan rule item id sama dengan id dari parameter
        return item.id == id;
    });
}

/** Get item berdasarkan id */
Array.prototype.getByid = function (id) {
    // Mencari index dari item
    var index = this.getIndexById(id);

    // Jika nilai index lebih dari -1, karena array dimulai dari index 0
    if (index > -1) {
        // Misalkan index adalah 1, Return copy item dari this yg index ke index ke 1
        // untuk mencegah perubahan data terhadap object aslinya
        return Object.assign({}, this[index]);
    }

    // Default return null
    return null;
}

/** Get id terakhir yg ada di this plus 1*/
Array.prototype.getLastId = function () {
    // Default id 0
    var id = 0;

    // Implementasi sort array
    var sortedData = this.sort(function (a, b) {
        // Dengan rule urutkan id secara descending (besar ke kecil)
        return b.id - a.id;
    });

    // Jika sortedData ada isinya
    if (sortedData.length > 0) {
        // Maka ambil id item pertama dari data
        id = sortedData[0].id;
    }

    // return last id + 1, misalkan last id = 1, maka hasilnya 1+1 = 2;
    return id + 1;
}

/** Create item baru dengan default id dari getLastId */
Array.prototype.create = function (item) {
    // Buat id baru
    item.id = this.getLastId();

    // Menambahkan item ke array this
    this.push(item);

    // return item dengan id baru
    return item;
}

/** Read item berdasarkan item id atau semua data ke console */
Array.prototype.read = function (item) {
    if (item && item.id) {
        return this.getByid(item.id);
    }

    return this;
}

/** Update item berdasarkan item id */
Array.prototype.update = function (item) {
    // Jika item memiliki id
    if (item.id) {
        // Cari index dari item tersebut yg ada di this
        var index = this.getIndexById(item.id);

        // Jika ditemukan, maka replace item tersebut dengan item dari parameter
        if (index > -1) {
            this[index] = item;

            // Return unmodify item
            return item;
        }
    }

    // Error jika tidak ditemukan item
    throw new Error("Invalid item");
}

/** Delete item berdasarkan item id */
Array.prototype.delete = function (item) {
    // Jika item memiliki id
    if (item && item.id) {
        // Cari index dari item tersebut yg ada di this
        var index = this.getIndexById(item.id);

        // Jika ditemukan, maka replace item tersebut dengan item dari parameter
        if (index > -1) {
            this.splice(index, 1);

            return item;
        }
    }

    // Error jika tidak ditemukan item
    throw new Error("Invalid item");
}

/** Update/Create item berdasarkan item id jika ada */
Array.prototype.save = function (item) {
    // Jika item memiliki id
    if (item.id) {
        // Call update function
        return this.update(item);
    }

    // Call create function
    return this.create(item);
}