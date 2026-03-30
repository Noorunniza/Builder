import styled from "styled-components"

export const DetailsWrap = styled.section`
  padding: 28px 16px 40px;
  background:
    radial-gradient(circle at top left, rgba(148, 163, 184, 0.1), transparent 28%),
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
`

export const DetailsContainer = styled.div`
  max-width: 1160px;
  margin: 0 auto;
`

export const BackButton = styled.button`
  border: none;
  background: transparent;
  color: #334155;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-bottom: 14px;

  &:hover {
    color: #0f172a;
  }
`

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: ${p => p.$device === "mobile" ? "1fr" : "minmax(0, 0.92fr) minmax(0, 1.08fr)"};
  gap: ${p => p.$device === "mobile" ? "18px" : "18px"};
  align-items: start;
`

export const MediaCard = styled.div`
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(226, 232, 240, 0.95);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 0.94)),
    #f8fafc;
  aspect-ratio: 4 / 5;
  width: 100%;
  min-height: 320px;
  margin: 0;
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
`

export const MediaImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 320px;
  object-fit: contain;
  object-position: center;
  display: block;
  background: white;
  padding: 14px;
`

export const MediaPlaceholder = styled.div`
  width: 100%;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
  background: repeating-linear-gradient(
    45deg,
    #f8fafc,
    #f8fafc 10px,
    #f1f5f9 10px,
    #f1f5f9 20px
  );
`

export const InfoCard = styled.div`
  border-radius: 22px;
  border: 1px solid rgba(226, 232, 240, 0.95);
  background: rgba(255, 255, 255, 0.96);
  padding: 26px;
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);

  @media (min-width: 900px) {
    position: sticky;
    top: 18px;
  }
`

export const ProductMeta = styled.p`
  margin: 0 0 12px;
  color: #475569;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`

export const ProductTitle = styled.h2`
  margin: 0 0 10px;
  color: #0f172a;
  font-size: clamp(26px, 3.2vw, 38px);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.03em;
`

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 18px;
`

export const CurrentPrice = styled.span`
  font-size: clamp(30px, 4vw, 40px);
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.02em;
`

export const OldPrice = styled.span`
  font-size: 16px;
  color: #94a3b8;
  text-decoration: line-through;
`

export const SaveBadge = styled.span`
  background: linear-gradient(180deg, #dcfce7, #bbf7d0);
  color: #166534;
  font-size: 12px;
  font-weight: 700;
  border-radius: 999px;
  padding: 5px 11px;
`

export const Description = styled.p`
  margin: 0 0 18px;
  color: #334155;
  font-size: 15px;
  line-height: 1.65;
`

export const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

export const FeatureItem = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #f8fafc;
  padding: 11px 12px;
  color: #334155;
  font-size: 13px;
  font-weight: 600;
`

export const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 4px;
`

export const QtyWrap = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  overflow: hidden;
  background: white;
`

export const QtyBtn = styled.button`
  border: none;
  width: 36px;
  height: 36px;
  background: #f8fafc;
  color: #0f172a;
  font-size: 18px;
  cursor: pointer;
`

export const QtyVal = styled.span`
  width: 40px;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
`

export const AddBtn = styled.button`
  border: none;
  background: ${p => p.$primary || "#0f172a"};
  color: white;
  height: 44px;
  padding: 0 22px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.14);
`

export const AddedNote = styled.p`
  margin: 12px 0 0;
  color: #16a34a;
  font-size: 13px;
  font-weight: 600;
`

export const SimilarSection = styled.section`
  margin-top: 34px;
`

export const SimilarTitle = styled.h3`
  margin: 0 0 14px;
  font-size: 24px;
  color: #0f172a;
  font-weight: 800;
`

export const SimilarGrid = styled.div`
  display: grid;
  grid-template-columns: ${p => p.$device === "mobile" ? "repeat(2, 1fr)" : "repeat(4, 1fr)"};
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const SimilarCard = styled.button`
  border: 1px solid #e2e8f0;
  background: white;
  padding: 0;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  text-align: left;
`

export const SimilarImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: contain;
  object-position: center;
  display: block;
  background: white;
`

export const SimilarInfo = styled.div`
  padding: 10px 10px 12px;
`

export const SimilarName = styled.p`
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.3;
`

export const SimilarPrice = styled.p`
  margin: 0;
  font-size: 14px;
  color: #111827;
  font-weight: 800;
`
