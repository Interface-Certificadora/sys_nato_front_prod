import getLastPoliticaTermo from "@/actions/politicastermos/getPoliticasTermos";

export default async function PrivacyPolicyPage() {
  const data = await getLastPoliticaTermo();

  const htmlContent = data?.politicas || 'ERROR: Política de privacidade não encontrada.';


  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', backgroundColor: '#f9f9f9' }}>
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }} // Ajuste o maxWidth para algo maior
      />
    </div>
  );
}
