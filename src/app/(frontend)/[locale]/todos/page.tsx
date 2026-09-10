import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function TodosPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from('todos').select();

  return (
    <div className="pt-32 pb-20 px-4 max-w-2xl mx-auto">
      <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
          Supabase Server Component
        </span>
        <h1 className="text-2xl font-serif font-bold text-accbcf-charcoal">
          Supabase Todos Integration Test
        </h1>
        {(!todos || todos.length === 0) ? (
          <p className="text-accbcf-gray text-sm leading-relaxed">
            Connected to Supabase project. No items found in the &apos;todos&apos; table yet.
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {todos.map((todo: any) => (
              <li key={todo.id} className="py-2 text-sm text-accbcf-charcoal">
                {todo.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

