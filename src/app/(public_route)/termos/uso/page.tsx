import getLastPoliticaTermo from "@/actions/politicastermos/getPoliticasTermos";

export default async function TermsOfServicePage() {
  const data = await getLastPoliticaTermo();

  const htmlContent = data?.termo || 'ERROR: Termo de uso não encontrado.';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', backgroundColor: '#f9f9f9' }}>
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
