export interface CreateCollection {
  name: string;
  description?: string;
}

export interface UpdateCollection {
  name?: string;
  description?: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
