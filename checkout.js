export async function checkout() {
    try {
        const res = await fetch("/api/checkout/vaporfang", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        // Check if the response is OK
        if (!res.ok) {
            const errorData = await res.json();
            console.error("Checkout API error:", errorData);
            throw new Error(errorData.error || "Failed to create checkout session");
        }
        
        const data = await res.json();
        
        // Verify we have a URL before redirecting
        if (!data.url) {
            console.error("No checkout URL returned:", data);
            throw new Error("No checkout URL received from Stripe");
        }
        
        window.location.href = data.url;
    } catch(error){
        console.error("Purchase Failed: ", error);
        // Optionally show user-friendly error message
        alert("Sorry, there was an error processing your purchase. Please try again.");
    }
}