import React from 'react';

const RelatorioPDFExport = ({
  brandSummary,
  archetype,
  archetypesChart,
  attributes,
  insights,
  guidelines
}) => {
  const renderBar = (value, isHighlighted) => (
    <div style={{ width: '100%', backgroundColor: '#f0f0f0', height: '10px', borderRadius: '5px' }}>
      <div 
        style={{ 
          width: `${value}%`, 
          backgroundColor: isHighlighted ? '#22c55e' : '#cbd5e1', 
          height: '10px', 
          borderRadius: '5px' 
        }} 
      />
    </div>
  );

  const renderAttributeBar = (name, value) => (
    <div key={name} style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '14px' }}>{name}</span>
        <span style={{ fontSize: '14px' }}>{value}/10</span>
      </div>
      <div style={{ width: '100%', backgroundColor: '#f0f0f0', height: '8px', borderRadius: '4px' }}>
        <div 
          style={{ 
            width: `${value * 10}%`, 
            backgroundColor: '#22c55e', 
            height: '8px', 
            borderRadius: '4px' 
          }} 
        />
      </div>
    </div>
  );

  return (
    <div style={{ 
      fontFamily: 'sans-serif', 
      color: '#000000', 
      backgroundColor: '#ffffff',
      padding: '20px',
      maxWidth: '800px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
          Relatório Estratégico de Marca
        </h1>
        <p style={{ fontSize: '14px', color: '#666666' }}>
          Relatório gerado pelo assistente de de diferenciação Axys
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #dddddd', paddingBottom: '5px' }}>
          Resumo da Marca
        </h2>
        <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#333333' }}>
          {brandSummary}
        </p>
      </div>

      {archetype && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #dddddd', paddingBottom: '5px' }}>
            Arquétipo Compatível
          </h2>
          <div style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '6px', marginBottom: '10px' }}>
            <span style={{ 
              fontWeight: 'bold', 
              fontSize: '16px', 
              backgroundColor: '#22c55e', 
              color: '#ffffff',
              padding: '4px 12px',
              borderRadius: '15px',
              display: 'inline-block',
              marginBottom: '10px'
            }}>
              {archetype.nome}
            </span>
            <p style={{ fontSize: '14px', color: '#333333', marginTop: '10px' }}>
              {archetype.descricao}
            </p>
            {archetype.exemplos && (
              <p style={{ fontSize: '14px', marginTop: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>Marcas similares:</span>{' '}
                {archetype.exemplos.join(', ')}
              </p>
            )}
          </div>
        </div>
      )}

      {archetypesChart && archetypesChart.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #dddddd', paddingBottom: '5px' }}>
            Compatibilidade entre Arquétipos
          </h2>
          <div style={{ marginTop: '15px' }}>
            {archetypesChart.map((item) => (
              <div key={item.nome} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px' }}>{item.nome}</span>
                  <span style={{ fontSize: '14px' }}>{item.valor.toFixed(1)}%</span>
                </div>
                {renderBar(item.valor, item.nome === archetype?.nome)}
              </div>
            ))}
          </div>
        </div>
      )}

      {attributes && attributes.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #dddddd', paddingBottom: '5px' }}>
            Atributos da Marca
          </h2>
          <div style={{ marginTop: '15px' }}>
            {attributes.map((attr) => renderAttributeBar(attr.atributo, attr.valor))}
          </div>
        </div>
      )}

      {insights && insights.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #dddddd', paddingBottom: '5px' }}>
            Insights Estratégicos
          </h2>
          <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#333333' }}>
            {insights.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {guidelines && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #dddddd', paddingBottom: '5px' }}>
            Diretrizes de Marca
          </h2>

          {guidelines.visual && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Diretrizes Visuais</h3>
              <p style={{ fontSize: '14px', color: '#333333' }}>{guidelines.visual}</p>
            </div>
          )}

          {guidelines.verbal && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Diretrizes Verbais</h3>
              <p style={{ fontSize: '14px', color: '#333333' }}>{guidelines.verbal}</p>
            </div>
          )}

          {guidelines.simbolico && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Referência Simbólica</h3>
              <p style={{ fontSize: '14px', color: '#333333' }}>{guidelines.simbolico}</p>
            </div>
          )}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '50px', borderTop: '1px solid #dddddd', paddingTop: '20px' }}>
        <p style={{ fontSize: '12px', color: '#666666' }}>
          © {new Date().getFullYear()} - Relatório gerado em {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default RelatorioPDFExport;