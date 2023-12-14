using Colossal.Annotations;
using Colossal.UI.Binding;
using System;
using System.Collections.Generic;

namespace HookUI.Writers
{
    internal class HashSetWriter<T> : IWriter<HashSet<T>>
    {
        [NotNull]
        private readonly IWriter<T> m_ItemWriter;

        public HashSetWriter( IWriter<T> itemWriter = null )
        {
            m_ItemWriter = itemWriter ?? ValueWriters.Create<T>( );
        }

        public void Write( IJsonWriter writer, HashSet<T> value )
        {
            if ( value != null )
            {
                writer.ArrayBegin( value.Count );
                foreach ( T item in value )
                {
                    m_ItemWriter.Write( writer, item );
                }

                writer.ArrayEnd( );
                return;
            }

            writer.WriteNull( );
            throw new ArgumentNullException( "value", "Null passed to non-nullable hashset writer" );
        }
    }
}
