create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  category_id uuid references categories(id) on delete set null,
  price integer not null default 0,
  stock integer not null default 0,
  description text,
  image_url text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists settings (
  id uuid primary key default gen_random_uuid(),
  store_name text,
  store_contact text,
  payment_gateway text default 'midtrans',
  payment_config jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  total_price integer not null default 0,
  status text not null default 'pending',
  roblox_username text not null,
  delivery_email text not null,
  created_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null,
  quantity integer not null default 1,
  price_per_unit integer not null default 0,
  subtotal integer not null default 0,
  created_at timestamptz default now()
);

alter table products enable row level security;
alter table categories enable row level security;
alter table settings enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'products'
      AND policyname = 'products_read_public'
  ) THEN
    CREATE POLICY products_read_public ON public.products
      FOR SELECT
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'categories'
      AND policyname = 'categories_read_public'
  ) THEN
    CREATE POLICY categories_read_public ON public.categories
      FOR SELECT
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'settings'
      AND policyname = 'settings_read_public'
  ) THEN
    CREATE POLICY settings_read_public ON public.settings
      FOR SELECT
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'settings'
      AND policyname = 'settings_write_public'
  ) THEN
    CREATE POLICY settings_write_public ON public.settings
      FOR ALL
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'orders'
      AND policyname = 'orders_insert_public'
  ) THEN
    CREATE POLICY orders_insert_public ON public.orders
      FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'orders'
      AND policyname = 'orders_select_public'
  ) THEN
    CREATE POLICY orders_select_public ON public.orders
      FOR SELECT
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'order_items'
      AND policyname = 'order_items_insert_public'
  ) THEN
    CREATE POLICY order_items_insert_public ON public.order_items
      FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'order_items'
      AND policyname = 'order_items_select_public'
  ) THEN
    CREATE POLICY order_items_select_public ON public.order_items
      FOR SELECT
      USING (true);
  END IF;
END $$;