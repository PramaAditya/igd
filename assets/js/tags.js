$(document).ready(function () {
    $('input[name="allergen_foods"]').tagify({
        whitelist: [
            "Gluten",
            "Susu",
            "Telur",
            "Kacang Tanah",
            "Kedelai",
            "Kacang Almond",
            "Kacang Mete",
            "Kepiting",
            "Udang",
            "Kerang",
            "Ikan",
            "Hazelnut",
            "Kenari",
            "Sulfida"
        ],
        maxTags: 20,
        dropdown: {
            position: "input",      // place the dropdown near the typed text
            maxItems: 20,           // <- mixumum allowed rendered suggestions
            classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
            enabled: 0,             // <- show suggestions on focus
            closeOnSelect: false    // <- do not hide the suggestions dropdown once an item has been selected
        }
    })
        .on('add', function (e, tagName) {
            console.log('JQEURY EVENT: ', 'added', tagName)
        })
        .on("invalid", function (e, tagName) {
            console.log('JQEURY EVENT: ', "invalid", e, ' ', tagName);
        });

    $('input[name="allergen_medicines"]').tagify({
        whitelist: [
            "Penicillin",
            "Sulfonamides",
            "Aspirin",
            "Ibuprofen",
            "Codeine",
            "Sulfa Drugs",
            "Morphine",
            "Insulin",
            "Local Anesthetics",
            "Anticonvulsants",
            "Cephalosporins",
            "NSAIDs (Nonsteroidal anti-inflammatory drugs)",
            "Radiocontrast media",
            "Monosodium glutamate (MSG)",
            "Erythromycin",
            "Ciprofloxacin",
            "Vancomycin",
            "Doxycycline",
            "Acetaminophen",
            "Ace inhibitors"
        ],
        maxTags: 20,
        dropdown: {
            position: "input",      // place the dropdown near the typed text
            maxItems: 20,           // <- mixumum allowed rendered suggestions
            classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
            enabled: 0,             // <- show suggestions on focus
            closeOnSelect: false    // <- do not hide the suggestions dropdown once an item has been selected
        }
    })
        .on('add', function (e, tagName) {
            console.log('JQEURY EVENT: ', 'added', tagName)
        })
        .on("invalid", function (e, tagName) {
            console.log('JQEURY EVENT: ', "invalid", e, ' ', tagName);
        });
});    