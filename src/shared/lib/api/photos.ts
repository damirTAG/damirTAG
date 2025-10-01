export interface Response {
    total: number;
    length: number;
    photos: Photo[];
}

export interface Photo {
    id: number;
    title: string;
    slug: string;
    url: string;
    tags: string;
    created_at: string;
    updated_at: string;
}

interface PaginationParams {
    offset?: number;
    limit?: number;
}

const API_BASE = "https://api.damir.top";
const API_KEY = "";

export class PhotosAPI {
    private apiKey?: string;

    constructor(apiKey?: string) {
        this.apiKey = apiKey ?? API_KEY;
    }

    private getHeaders(withAuth = false) {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        if (withAuth && this.apiKey) {
            headers["x-api-key"] = this.apiKey;
        }
        return headers;
    }

    /** GET /photos?offset=&limit= */
    async getAll(params?: PaginationParams): Promise<Response> {
        const query = new URLSearchParams();
        if (params?.offset !== undefined) query.append("offset", params.offset.toString());
        if (params?.limit !== undefined) query.append("limit", params.limit.toString());

        const res = await fetch(`${API_BASE}/photos/?${query.toString()}`, {
            headers: this.getHeaders(),
        });
        if (!res.ok) throw new Error(`Failed to fetch photos: ${res.statusText}`);
        return res.json();
    }

    /** POST /photos */
    async create(data: { title: string; url: string; tags: string }): Promise<Photo> {
        const res = await fetch(`${API_BASE}/photos/`, {
            method: "POST",
            headers: this.getHeaders(true),
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Failed to create photo: ${res.statusText}`);
        return res.json();
    }

    /** GET /photos/{photo_id} */
    async get(photoId: number): Promise<Photo> {
        const res = await fetch(`${API_BASE}/photos/${photoId}`, {
            headers: this.getHeaders(),
        });
        if (!res.ok) throw new Error(`Failed to fetch photo: ${res.statusText}`);
        return res.json();
    }

    /** GET /photos/slug/{slug} */
    async getBySlug(slug: string): Promise<Photo> {
        const res = await fetch(`${API_BASE}/photos/slug/${slug}`, {
            headers: this.getHeaders(),
        });
        if (!res.ok) throw new Error(`Failed to fetch photo: ${res.statusText}`);
        return res.json();
    }

    /** PUT /photos/{photo_id} */
    async update(photoId: number, data: Partial<{ title: string; url: string; tags: string }>): Promise<Photo> {
        const res = await fetch(`${API_BASE}/photos/${photoId}`, {
            method: "PUT",
            headers: this.getHeaders(true),
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Failed to update photo: ${res.statusText}`);
        return res.json();
    }

    /** DELETE /photos/{photo_id} */
    async delete(photoId: number): Promise<{ success: boolean }> {
        const res = await fetch(`${API_BASE}/photos/${photoId}`, {
            method: "DELETE",
            headers: this.getHeaders(true),
        });
        if (!res.ok) throw new Error(`Failed to delete photo: ${res.statusText}`);
        return res.json();
    }

    /** GET /photos/search?query=&offset=&limit= */
    async search(query: string, params?: PaginationParams): Promise<Photo[]> {
        const searchParams = new URLSearchParams();
        searchParams.append("query", query);
        if (params?.offset !== undefined) searchParams.append("offset", params.offset.toString());
        if (params?.limit !== undefined) searchParams.append("limit", params.limit.toString());

        const res = await fetch(`${API_BASE}/photos/search?${searchParams.toString()}`, {
            headers: this.getHeaders(),
        });
        if (!res.ok) throw new Error(`Failed to search photos: ${res.statusText}`);
        return res.json();
    }
}
