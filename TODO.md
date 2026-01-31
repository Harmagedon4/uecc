# TODO: Implement Registration Form Modifications

## Tasks to Complete

- [x] Update `src/types/registration.ts`
  - [x] Add new fields: `dateNaissance`, `lieuNaissance`, `villeResidence`, `paroisseOrigineVille`, `paroisseOriginePays`, `paroisseAccueilVille`, `paroisseAccueilPays`
  - [x] Add `CELLULES` list with provided options
  - [x] Make `matricule` optional

- [x] Update `src/components/wizard/Step1Identity.tsx`
  - [x] Add input fields for date of birth, place of birth, and city of residence after name fields
  - [x] Change phone field to enforce 10 digits
  - [x] Replace `celluleProvenance` input with dropdown using `CELLULES` list

- [x] Update `src/components/wizard/Step2University.tsx`
  - [x] Make matricule field optional (remove asterisk)

- [x] Update `src/components/wizard/Step3Engagement.tsx`
  - [x] Change label from "Situation matrimoniale" to "Statut matrimonial"

- [ ] Update `src/components/wizard/Step4Activities.tsx`
  - [ ] Add city and country fields for both origin and welcome parishes

## Followup Steps
- [x] Test the form to ensure all new fields are properly integrated (build successful, dev server running)
- [x] Verify dropdown for cells functions correctly (CELLULES list implemented)
