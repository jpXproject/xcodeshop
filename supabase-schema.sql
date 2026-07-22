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

create policy if not exists products_read_public on products
  for select using (true);

create policy if not exists categories_read_public on categories
  for select using (true);

create policy if not exists settings_read_public on settings
  for select using (true);

create policy if not exists settings_write_public on settings
  for all using (true) with check (true);

create policy if not exists orders_insert_public on orders
  for insert with check (true);

create policy if not exists orders_select_public on orders
  for select using (true);

create policy if not exists order_items_insert_public on order_items
  for insert with check (true);

create policy if not exists order_items_select_public on order_items
  for select using (true);
