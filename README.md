ER Diagram
    POLICYHOLDER {
        int id PK
        string name
        string email
        string password
        string contact_info
        date date_of_birth
    }
    
    POLICY {
        int id PK
        int policyholder_id FK
        string policy_type
        float coverage_amount
        date start_date
        date end_date
    }
    
    CLAIM {
        int id PK
        int policy_id FK
        float claim_amount
        date claim_date
        string status
        string description
    }
    
    DOCUMENT {
        int id PK
        int claim_id FK
        string document_url
        date upload_date
    }
    
    PAYMENT {
        int id PK
        int policyholder_id FK
        float amount
        date payment_date
        string payment_type
    }

    POLICYHOLDER ||--o{ POLICY : "has"
    POLICY ||--o{ CLAIM : "can have"
    CLAIM ||--o{ DOCUMENT : "can have"
    POLICYHOLDER ||--o{ PAYMENT : "makes"
