export const imageBaseUrl = `${process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_API_DEV_URL : process.env.NEXT_PUBLIC_API_BASE_URL}/uploads`;

export const defaultAltText = "High Creation Interior"