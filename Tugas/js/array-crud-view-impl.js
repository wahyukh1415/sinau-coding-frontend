/**
 * Created by n.fajar 10/09/2019.
 */

/** Variabel untuk menampung item object berisikan id */
var datas = [];

/** Create baris dan colom table */
function createRowACtion(item) {
    var actions = "";
    var rows = "";

    // Chek jika item tidak diisi, berarti row/item baru
    if (!item) {
        // Membuat button actions cancel dan save saja
        actions = '<button class="btn btn-danger button-cancel always-show" onclick="onEditOrCancel(this, \'CANCEL\')"> <i class="material-icons text-white">cancel</i> </button>' +
            '<button class="btn btn-success button-save always-show" onclick="onSaveOrDelete(this, \'SAVE\')"> <i class="material-icons text-white">save</i> </button>';

        // Membuat row dengan default value empty
        rows = '<tr class="new-item">' +
            '<td>-</td>' +
            // Tampilkan sebagai input text dengan default shown
            '<td class="input-content always-show"><input value="" autofocus></td>' +
            // Button actions dengan data-id empty
            '<td data-id="">' + actions + '</td>' +
            '</tr>';
    } else {
        // Membuat button actions conditional show
        actions = '<button class="btn btn-success button-edit" onclick="onEditOrCancel(this, \'EDIT\')"> <i class="material-icons text-white">edit</i> </button>' +
            // Hanya tampil setelah klik edit
            '<button class="btn btn-danger button-cancel" onclick="onEditOrCancel(this, \'CANCEL\')"> <i class="material-icons text-white">cancel</i> </button>' +
            '<button class="btn btn-success button-save" onclick="onSaveOrDelete(this, \'SAVE\')"> <i class="material-icons text-white">save</i> </button>' +
            // Selalu tampil
            '<button class="btn btn-danger button-delete" onclick="onSaveOrDelete(this, \'DELETE\')"> <i class="material-icons text-white">delete</i> </button>';

        // Membuat row dengan isi berdasarkan item
        rows = '<tr>' +
            '<td>' + item.id + '</td>' +
            // Tampilkan sebagai text biasa
            '<td class="readonly-content" style="text-align:center">' + item.content + '</td>' +
            // Tampilkan sebagai input text dengan default hidden
            '<td class="input-content"><input value="' + item.content + '" autofocus></td>' +
            // Button actions dengan data-id dari item.id
            '<td data-id="' + item.id + '">' + actions + '</td>' +
            '</tr>';
    }

    return rows;
}

/** Check datas empty untuk set default text empty */
function checkEmpty() {
    if (datas.read().length == 0) {
        // Selector by attribut id ke tbody table
        var table = document.getElementById("table-data");

        // Kosongkan isi dari table data dengan empty text
        table.innerHTML = '<tr><td class="empty" colspan="3">No data found</td></tr>';
    }
}

/** Load array datas dan tampilkan table-data*/
function loadRow() {
    // Selector by attribut id ke tbody table
    var table = document.getElementById("table-data");

    // Kosongkan isi dari table
    table.innerHTML = "";

    // Validasi empty datas
    checkEmpty();

    // Load semua data array dan lakukan perulangan
    datas.read().forEach(function (item) {
        // Concat isi dari table data dengan row dan action
        table.innerHTML += createRowACtion(item);
    });
}

/** Create item baru kedalam table-data */
function addRow() {
    // Selector by attribut id ke tbody table
    var table = document.getElementById("table-data");

    var previousItem = table.getElementsByClassName("new-item");

    if (previousItem.length > 0) {
        alert("Your previous new item have not been saved!");

        // Set input content focus
        previousItem[0].getElementsByTagName("input")[0].focus();
    } else {
        // Remove empty text ketika data masih 0
        if (datas.read().length == 0) {
            table.innerHTML = "";
        }

        // Tambahkan isi row item baru ke table data
        table.innerHTML += createRowACtion();
    }
}

/** Toggle edit mode */
function onEditOrCancel(element, type) {
    // Query document untuk menemukan tag parentya
    var parentElement = element.parentNode;

    // Query document untuk menemukan button dengan bantuan parent element
    var buttonEdit = parentElement.querySelector('.button-edit');
    var buttonCancel = parentElement.querySelector('.button-cancel');
    var buttonSave = parentElement.querySelector('.button-save');
    var buttonDelete = parentElement.querySelector('.button-delete');

    // Query document untuk menemukan td berisi text content dan td berisikan input content
    var inputContent = parentElement.parentNode.querySelector('.input-content');
    var readonlyContent = parentElement.parentNode.querySelector('.readonly-content');
    var content = inputContent.getElementsByTagName("input")[0];

    if (type == "EDIT") {
        // Sembunyikan button edit dan delete
        buttonEdit.style.display = "none";
        buttonDelete.style.display = "none";

        // Tampilkan button cancel dan save
        buttonCancel.style.display = "inline-block";
        buttonSave.style.display = "inline-block";

        // Tampilkan input content dan hide readonly content
        inputContent.style.display = "table-cell";
        readonlyContent.style.display = "none";
    } else {
        // True jika content sebelumnya null (item baru) atau isi content sebelumnya tidak sama dengan yg diinputkan user
        var isContentChange = readonlyContent == null || (readonlyContent && content.value != readonlyContent.innerHTML);

        // Check apa input content sudah diubah, jika ya confirmasi cancel
        if (isContentChange && !confirm("Your changes have not been saved, continue?")) {
            // Jika tidak diconfirmasi maka return untuk stop eksekusi next code sehingga tampilan tidak tereset
            return;
        }

        // Check content item tidak null (item baru)
        if (readonlyContent != null) {
            // Sembunyikan button cancel dan save
            buttonCancel.style.display = "none";
            buttonSave.style.display = "none";

            // Tampilkan button edit dan delete
            buttonEdit.style.display = "inline-block";
            buttonDelete.style.display = "inline-block";

            // Tampilkan input content dan hide readonly content
            inputContent.style.display = "none";
            readonlyContent.style.display = "table-cell";

            // Reset default content value
            content.value = readonlyContent.innerHTML;
        } else {
            // Find parentElement.parentNode (tr) => parentElement.parentNode.parentNode (table) kemudian delete tr
            parentElement.parentNode.parentNode.removeChild(parentElement.parentNode);
        }

        // Chek empty
        checkEmpty();
    }
}

/** Create/Update atau Delete item */
function onSaveOrDelete(element, type) {
    // Query document untuk menemukan tag parentya
    var parentElement = element.parentNode;

    // Query document untuk menemukan button dengan bantuan parent element
    var buttonEdit = parentElement.querySelector('.button-edit');
    var buttonCancel = parentElement.querySelector('.button-cancel');
    var buttonSave = parentElement.querySelector('.button-save');
    var buttonDelete = parentElement.querySelector('.button-delete');

    // Query document untuk mengambil nilai dari attribut data-id yg ada pada td, parent dari button actions
    var dataId = parentElement.getAttribute("data-id");

    if (type == "SAVE") {
        var inputContent = parentElement.parentNode.querySelector('.input-content');
        var content = inputContent.getElementsByTagName("input")[0];

        // Empty object
        var item = {};

        // Jika ada idnya
        if (dataId) {
            // Get old item from array datas
            item = datas.read({
                id: dataId
            });
        }

        // Modifikasi/Add content dari item dengan content dari inputan
        item.content = content.value;

        // Simpan perubahan ke array datas
        datas.save(item);

        // Updating view table data
        loadRow();
    } else if (dataId) {
        if (confirm("Are you sure want to delete this item with id " + dataId + " ?")) {
            // Delete item by id from array datas
            datas.delete({
                id: dataId
            });

            // Updating view table data
            loadRow();
        }
    }
}

// Initial load data to table-data
loadRow();