/**
 * Created by n.fajar 10/08/2019.
 */

/** Variabel untuk menampung item object berisikan id */
var datas = [{
    id: 1,
    content: "Test 1"
}];

// Print data awal ke console dengan format string json
console.log("All items", JSON.stringify(datas.read()));

// Create item dengan content Test 2
var newItem = {
    content: "Test 2"
};

// Print hasilnya ke console dengan format string json
console.log(
    "New item",
    JSON.stringify(newItem),
    "save to",
    JSON.stringify(datas.create(newItem))
);

// Print data ke console dengan format string json
console.log("All items", JSON.stringify(datas.read()));

// Spasi console
console.log("\n\n");

// Print data ke console dengan format string json
console.log("All items", JSON.stringify(datas.read()));

// Read item dengan id 2
var oldItem = datas.read({
    id: 2
});

// Print hasilnya ke console dengan format string json
console.log(
    "Old item",
    JSON.stringify(oldItem),
    "updated to",
    JSON.stringify(
        // Modifikasi content
        datas.update(
            Object.assign(oldItem, {
                content: "Test Update"
            })
        )
    )
);

// Print data ke console dengan format string json
console.log("All items", JSON.stringify(datas.read()));

// Spasi console
console.log("\n\n");

// Print data ke console dengan format string json
console.log("All items", JSON.stringify(datas.read()));

// Read item dengan id 2
var removeItem = datas.read({
    id: 2
});

// Print hasilnya ke console dengan format string json
console.log("Remove item", JSON.stringify(datas.delete(removeItem)));

// Print data ke console dengan format string json
console.log("All items", JSON.stringify(datas.read()));