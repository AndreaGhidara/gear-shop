export default function validateDataProductForm(productData, errorData) {
    
    if (!productData.name) {
        errorData.name = "Il nome è obbligatorio";
    } else {
        errorData.name = "";
    }

    if (!productData.description) {
        errorData.description = "La descrizione è obbligatoria";
    } else {
        errorData.description = "";
    }

    if (!productData.price) {
        errorData.price = "Il prezzo è obbligatorio";
    } else if (isNaN(Number(productData.price))) {
        errorData.price = "Il prezzo deve essere come indicato nell'esempio, non deve contenere lettere";
    } else {
        errorData.price = "";
    }

    if (productData.discount > 100 || productData.discount < 0) {
        errorData.discount = "Lo sconto può essere al massimo del 100%";
    } else {
        errorData.discount = "";
    }

    return errorData; // Restituisci l'oggetto errori aggiornato
}