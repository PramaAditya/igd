var tagifies = []; // array of Tagify instances


tagifies['allergen_foods'] = new Tagify($('input[name="allergen_foods"]')[0],{
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
});

tagifies['allergen_medicines'] = new Tagify($('input[name="allergen_medicines"]')[0],{
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

tagifies['history_case'] = new Tagify($('input[name="history_case"]')[0],{
    whitelist: [
        "Diabetes Melitus",
        "Stroke",
        "Asma",
        "Hipertensi",
        "Sakit Ginjal",
        "Sakit Jantung",
        "Sakit Liver",
    ],
    maxTags: 20,
    dropdown: {
        position: "input",      // place the dropdown near the typed text
        maxItems: 20,           // <- mixumum allowed rendered suggestions
        classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
        enabled: 0,             // <- show suggestions on focus
        closeOnSelect: true    // <- do not hide the suggestions dropdown once an item has been selected
    }
})
