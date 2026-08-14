<script lang="ts">
  import { tick } from 'svelte';

  type MatterType = 'business' | 'contract' | 'real-estate' | 'estate-planning' | 'probate' | 'other';
  type SubmissionState = 'idle' | 'loading' | 'failure' | 'success';

  interface MatterOption { value: MatterType; label: string; description: string; }
  interface Choice { value: string; label: string; }
  interface ConditionalQuestions { primaryLabel: string; primaryOptions: Choice[]; secondaryLabel: string; secondaryOptions: Choice[]; }

  const progressLabels = ['Matter', 'Details', 'Contact', 'Review'];
  const matterOptions: MatterOption[] = [
    { value: 'business', label: 'Business dispute', description: 'Conflict involving business ownership, management, payment, fiduciary duties, or another commercial relationship.' },
    { value: 'contract', label: 'Contract matter', description: 'A disagreement involving the meaning, performance, enforcement, or termination of an agreement.' },
    { value: 'real-estate', label: 'Commercial real estate', description: 'A purchase, sale, lease, ownership, or dispute involving commercial property.' },
    { value: 'estate-planning', label: 'Estate planning', description: 'Planning involving wills, trusts, incapacity, succession, or transfer of property.' },
    { value: 'probate', label: 'Probate', description: 'Estate administration, executor responsibilities, beneficiary issues, or probate disputes.' },
    { value: 'other', label: 'Something else', description: 'The matter does not clearly fit one of the categories above.' },
  ];

  const conditionalQuestions: Partial<Record<MatterType, ConditionalQuestions>> = {
    business: {
      primaryLabel: 'What best describes the dispute?',
      primaryOptions: [
        { value: 'owner-disagreement', label: 'disagreement between owners' },
        { value: 'payment-commercial', label: 'payment or commercial dispute' },
        { value: 'fiduciary-duty', label: 'fiduciary-duty concern' },
        { value: 'company-control', label: 'company control or management issue' },
        { value: 'other-business', label: 'another business dispute' },
      ],
      secondaryLabel: 'Has a lawsuit already been filed?',
      secondaryOptions: choices('Yes', 'No', 'Unsure'),
    },
    contract: {
      primaryLabel: 'What is the primary issue?',
      primaryOptions: choices('payment', 'non-performance', 'termination', 'interpretation of the agreement', 'another contract issue'),
      secondaryLabel: 'Is there a written agreement?',
      secondaryOptions: choices('Yes', 'No', 'Unsure'),
    },
    'real-estate': {
      primaryLabel: 'What type of matter is this?',
      primaryOptions: choices('purchase', 'sale', 'lease', 'property dispute', 'ownership issue', 'other'),
      secondaryLabel: 'Has an agreement already been signed?',
      secondaryOptions: choices('Yes', 'No', 'Unsure'),
    },
    'estate-planning': {
      primaryLabel: 'What are you planning for?',
      primaryOptions: choices('individual estate plan', 'family estate plan', 'business succession', 'update to an existing plan', 'other'),
      secondaryLabel: 'Do you currently have estate-planning documents?',
      secondaryOptions: choices('Yes', 'No', 'Unsure'),
    },
    probate: {
      primaryLabel: 'What best describes your role?',
      primaryOptions: choices('executor or administrator', 'beneficiary', 'family member', 'another interested party', 'unsure'),
      secondaryLabel: 'Is there currently a dispute?',
      secondaryOptions: choices('Yes', 'No', 'Possibly'),
    },
  };

  function choices(...labels: string[]): Choice[] {
    return labels.map((label) => ({ value: label.toLowerCase().replaceAll(' ', '-'), label }));
  }

  let step = 1;
  let submissionState: SubmissionState = 'idle';
  let errors: Record<string, string> = {};
  let errorSummary: HTMLDivElement;
  let stepHeading: HTMLHeadingElement;
  const createInitialForm = () => ({
    matterType: '' as MatterType | '',
    description: '',
    primaryDetail: '',
    secondaryDetail: '',
    fullName: '',
    email: '',
    phone: '',
    preferredContact: '',
    preferredPeriod: '',
  });
  let form = createInitialForm();

  $: activeQuestions = form.matterType ? conditionalQuestions[form.matterType] : undefined;
  $: selectedMatter = matterOptions.find((option) => option.value === form.matterType);
  $: selectedPrimary = activeQuestions?.primaryOptions.find((option) => option.value === form.primaryDetail)?.label;
  $: selectedSecondary = activeQuestions?.secondaryOptions.find((option) => option.value === form.secondaryDetail)?.label;

  function validateCurrentStep(): boolean {
    const nextErrors: Record<string, string> = {};
    if (step === 1 && !form.matterType) nextErrors.matterType = 'Choose the category that most closely matches the matter.';
    if (step === 2) {
      if (activeQuestions && !form.primaryDetail) nextErrors.primaryDetail = `Choose an answer for “${activeQuestions.primaryLabel}”`;
      if (activeQuestions && !form.secondaryDetail) nextErrors.secondaryDetail = `Choose an answer for “${activeQuestions.secondaryLabel}”`;
      if (!form.description.trim()) nextErrors.description = 'Briefly describe what is happening without including confidential or sensitive information.';
    }
    if (step === 3) {
      if (!form.fullName.trim()) nextErrors.fullName = 'Enter your full name.';
      if (!form.email.trim()) nextErrors.email = 'Enter an email address.';
      else if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter an email address in the format name@example.com.';
      if (!form.phone.trim()) nextErrors.phone = 'Enter a phone number.';
    }
    errors = nextErrors;
    if (Object.keys(errors).length > 0) focusErrors();
    return Object.keys(errors).length === 0;
  }

  async function focusErrors() {
    await tick();
    errorSummary?.focus();
  }

  async function goToStep(nextStep: number) {
    step = nextStep;
    errors = {};
    submissionState = 'idle';
    await tick();
    stepHeading?.focus();
  }

  function continueWizard() {
    if (validateCurrentStep()) goToStep(step + 1);
  }

  function selectMatter(value: MatterType) {
    if (form.matterType !== value) {
      form.matterType = value;
      form.primaryDetail = '';
      form.secondaryDetail = '';
    }
    errors.matterType = '';
  }

  async function completeDemo() {
    submissionState = 'loading';
    try {
      await new Promise<void>((resolve) => window.setTimeout(resolve, 500));
      submissionState = 'success';
      form = createInitialForm();
      step = 5;
      await tick();
      stepHeading?.focus();
    } catch {
      submissionState = 'failure';
    }
  }

  const errorOrder = ['matterType', 'primaryDetail', 'secondaryDetail', 'description', 'fullName', 'email', 'phone'];
  const errorLabels: Record<string, string> = {
    matterType: 'Matter type', primaryDetail: 'Matter details', secondaryDetail: 'Matter status', description: 'Matter description', fullName: 'Full name', email: 'Email address', phone: 'Phone number',
  };
</script>

<form class="wizard" aria-labelledby="wizard-heading" autocomplete="off" onsubmit={(event) => event.preventDefault()} novalidate={true}>
  {#if step < 5}
    <nav class="progress" aria-label="Consultation progress">
      <ol>
        {#each progressLabels as label, index}
          <li class:current={step === index + 1} class:complete={step > index + 1} aria-current={step === index + 1 ? 'step' : undefined}>
            <span>{index + 1}</span><span>{label}{#if step > index + 1}<span class="visually-hidden"> — complete</span>{/if}</span>
          </li>
        {/each}
      </ol>
    </nav>
  {/if}

  {#if Object.values(errors).some(Boolean)}
    <div class="error-summary" role="alert" tabindex="-1" bind:this={errorSummary}>
      <h2>Review the following information</h2>
      <p>Correct the fields below before continuing.</p>
      <ul>
        {#each errorOrder.filter((key) => errors[key]) as key}
          <li><a href={`#${key}`}>{errorLabels[key]}: {errors[key]}</a></li>
        {/each}
      </ul>
    </div>
  {/if}

  {#if step === 1}
    <section aria-labelledby="wizard-heading">
      <header class="step-header">
        <p>Step 1 of 4</p>
        <h2 id="wizard-heading" tabindex="-1" bind:this={stepHeading}>What can we help with?</h2>
        <p>Choose the category that most closely matches the issue. You can select <strong>Something else</strong> if you are unsure.</p>
      </header>
      <fieldset class:error-field={errors.matterType} aria-invalid={errors.matterType ? 'true' : undefined} aria-describedby={errors.matterType ? 'matterType-error' : undefined}>
        <legend class="visually-hidden">Matter type (required)</legend>
        <div class="matter-options">
          {#each matterOptions as option}
            <label class:checked={form.matterType === option.value}>
              <input id={option.value === 'business' ? 'matterType' : undefined} type="radio" name="matterType" value={option.value} checked={form.matterType === option.value} onchange={() => selectMatter(option.value)} required />
              <span><strong>{option.label}</strong><small>{option.description}</small></span>
            </label>
          {/each}
        </div>
        {#if errors.matterType}<p class="field-error" id="matterType-error">{errors.matterType}</p>{/if}
      </fieldset>
      <div class="actions actions--end"><button class="button button--primary" type="button" onclick={continueWizard}>Continue</button></div>
    </section>

  {:else if step === 2}
    <section aria-labelledby="wizard-heading">
      <header class="step-header">
        <p>Step 2 of 4</p>
        <h2 id="wizard-heading" tabindex="-1" bind:this={stepHeading}>Tell us about the matter.</h2>
      </header>

      {#if activeQuestions}
        <fieldset class:error-field={errors.primaryDetail} aria-invalid={errors.primaryDetail ? 'true' : undefined} aria-describedby={errors.primaryDetail ? 'primaryDetail-error' : undefined}>
          <legend>{activeQuestions.primaryLabel} <span class="requirement">(required)</span></legend>
          <div class="choice-row">
            {#each activeQuestions.primaryOptions as option}
              <label><input id={option === activeQuestions.primaryOptions[0] ? 'primaryDetail' : undefined} type="radio" name="primaryDetail" value={option.value} bind:group={form.primaryDetail} required /><span>{option.label}</span></label>
            {/each}
          </div>
          {#if errors.primaryDetail}<p class="field-error" id="primaryDetail-error">{errors.primaryDetail}</p>{/if}
        </fieldset>

        <fieldset class:error-field={errors.secondaryDetail} aria-invalid={errors.secondaryDetail ? 'true' : undefined} aria-describedby={errors.secondaryDetail ? 'secondaryDetail-error' : undefined}>
          <legend>{activeQuestions.secondaryLabel} <span class="requirement">(required)</span></legend>
          <div class="choice-row">
            {#each activeQuestions.secondaryOptions as option}
              <label><input id={option === activeQuestions.secondaryOptions[0] ? 'secondaryDetail' : undefined} type="radio" name="secondaryDetail" value={option.value} bind:group={form.secondaryDetail} required /><span>{option.label}</span></label>
            {/each}
          </div>
          {#if errors.secondaryDetail}<p class="field-error" id="secondaryDetail-error">{errors.secondaryDetail}</p>{/if}
        </fieldset>
      {/if}

      <div class="field" class:error-field={errors.description}>
        <label for="description">Briefly describe what is happening. <span class="requirement">(required)</span></label>
        <p class="helper" id="description-help">Provide enough information to understand the situation, but do not include confidential or sensitive information. This portfolio form does not transmit submissions.</p>
        <textarea id="description" rows="6" bind:value={form.description} aria-invalid={errors.description ? 'true' : undefined} aria-describedby={`description-help${errors.description ? ' description-error' : ''}`} required></textarea>
        {#if errors.description}<p class="field-error" id="description-error">{errors.description}</p>{/if}
      </div>
      <div class="actions"><button class="button button--secondary" type="button" onclick={() => goToStep(1)}>Back</button><button class="button button--primary" type="button" onclick={continueWizard}>Continue</button></div>
    </section>

  {:else if step === 3}
    <section aria-labelledby="wizard-heading">
      <header class="step-header">
        <p>Step 3 of 4</p>
        <h2 id="wizard-heading" tabindex="-1" bind:this={stepHeading}>How should the firm contact you?</h2>
      </header>
      <div class="contact-fields">
        <div class="field" class:error-field={errors.fullName}>
          <label for="fullName">Full name <span class="requirement">(required)</span></label>
          <input id="fullName" type="text" autocomplete="off" bind:value={form.fullName} aria-invalid={errors.fullName ? 'true' : undefined} aria-describedby={errors.fullName ? 'fullName-error' : undefined} required />
          {#if errors.fullName}<p class="field-error" id="fullName-error">{errors.fullName}</p>{/if}
        </div>
        <div class="field" class:error-field={errors.email}>
          <label for="email">Email address <span class="requirement">(required)</span></label>
          <input id="email" type="email" autocomplete="off" bind:value={form.email} aria-invalid={errors.email ? 'true' : undefined} aria-describedby={errors.email ? 'email-error' : undefined} required />
          {#if errors.email}<p class="field-error" id="email-error">{errors.email}</p>{/if}
        </div>
        <div class="field" class:error-field={errors.phone}>
          <label for="phone">Phone number <span class="requirement">(required)</span></label>
          <input id="phone" type="tel" autocomplete="off" bind:value={form.phone} aria-invalid={errors.phone ? 'true' : undefined} aria-describedby={errors.phone ? 'phone-error' : undefined} required />
          {#if errors.phone}<p class="field-error" id="phone-error">{errors.phone}</p>{/if}
        </div>
      </div>
      <fieldset>
        <legend>Preferred contact method <span class="requirement">(optional)</span></legend>
        <div class="choice-row">{#each choices('Phone', 'Email', 'Either') as option}<label><input type="radio" name="preferredContact" value={option.value} bind:group={form.preferredContact} /><span>{option.label}</span></label>{/each}</div>
      </fieldset>
      <fieldset>
        <legend>Preferred consultation period <span class="requirement">(optional)</span></legend>
        <div class="choice-row">{#each choices('Morning', 'Afternoon', 'No preference') as option}<label><input type="radio" name="preferredPeriod" value={option.value} bind:group={form.preferredPeriod} /><span>{option.label}</span></label>{/each}</div>
      </fieldset>
      <p class="portfolio-helper">This form is a functional portfolio demonstration. Information entered into the public demo should not be transmitted or stored.</p>
      <div class="actions"><button class="button button--secondary" type="button" onclick={() => goToStep(2)}>Back</button><button class="button button--primary" type="button" onclick={continueWizard}>Continue</button></div>
    </section>

  {:else if step === 4}
    <section aria-labelledby="wizard-heading">
      <header class="step-header">
        <p>Step 4 of 4</p>
        <h2 id="wizard-heading" tabindex="-1" bind:this={stepHeading}>Review your information.</h2>
        <p>Check the information below before completing the demonstration.</p>
      </header>
      <div class="review-groups">
        <section aria-labelledby="review-matter"><div class="review-heading"><h3 id="review-matter">Matter</h3><button type="button" aria-label="Edit matter type" onclick={() => goToStep(1)}>Edit</button></div><dl><div><dt>Matter type</dt><dd>{selectedMatter?.label}</dd></div></dl></section>
        <section aria-labelledby="review-details"><div class="review-heading"><h3 id="review-details">Details</h3><button type="button" aria-label="Edit matter details" onclick={() => goToStep(2)}>Edit</button></div><dl>{#if activeQuestions}<div><dt>{activeQuestions.primaryLabel}</dt><dd>{selectedPrimary}</dd></div><div><dt>{activeQuestions.secondaryLabel}</dt><dd>{selectedSecondary}</dd></div>{/if}<div><dt>Briefly describe what is happening.</dt><dd class="preserve-lines">{form.description}</dd></div></dl></section>
        <section aria-labelledby="review-contact"><div class="review-heading"><h3 id="review-contact">Contact</h3><button type="button" aria-label="Edit contact information" onclick={() => goToStep(3)}>Edit</button></div><dl><div><dt>Full name</dt><dd>{form.fullName}</dd></div><div><dt>Email address</dt><dd>{form.email}</dd></div><div><dt>Phone number</dt><dd>{form.phone}</dd></div>{#if form.preferredContact}<div><dt>Preferred contact method</dt><dd>{choices('Phone', 'Email', 'Either').find((option) => option.value === form.preferredContact)?.label}</dd></div>{/if}{#if form.preferredPeriod}<div><dt>Preferred consultation period</dt><dd>{choices('Morning', 'Afternoon', 'No preference').find((option) => option.value === form.preferredPeriod)?.label}</dd></div>{/if}</dl></section>
      </div>
      {#if submissionState === 'failure'}
        <div class="submission-error" role="alert"><h3>The demonstration could not be completed.</h3><p>Your information has not been sent or stored. Please try again.</p><button type="button" onclick={() => submissionState = 'idle'}>Try Again</button></div>
      {/if}
      <div class="actions"><button class="button button--secondary" type="button" onclick={() => goToStep(3)} disabled={submissionState === 'loading'}>Back</button><button class="button button--primary" type="button" onclick={completeDemo} disabled={submissionState === 'loading'} aria-busy={submissionState === 'loading'}>{submissionState === 'loading' ? 'Completing Demo…' : 'Complete Demo'}</button></div>
    </section>

  {:else}
    <section class="success" aria-labelledby="wizard-heading" aria-live="polite">
      <p>Consultation Demonstration</p>
      <h2 id="wizard-heading" tabindex="-1" bind:this={stepHeading}>Demonstration complete.</h2>
      <p>In a production implementation, the firm would receive the intake information and contact the prospective client according to its consultation process.</p>
      <p>Because Hawthorne & Cole is a fictional portfolio project, no legal inquiry has been submitted.</p>
      <a class="button button--primary" href="/">Return to Home</a>
    </section>
  {/if}
</form>

<style>
  .wizard { border-block-start: var(--border-width-emphasis) solid var(--accent); background: var(--background); color: var(--foreground); }
  .wizard > section, .error-summary { padding: var(--card-padding); }
  .progress { border-block-end: var(--border-width-hairline) solid var(--border); overflow-x: auto; }
  .progress ol { display: grid; grid-template-columns: repeat(4, minmax(max-content, 1fr)); min-width: max-content; margin: 0; padding: 0; list-style: none; }
  .progress li { display: flex; gap: var(--space-sm); align-items: center; border-block-end: var(--border-width-emphasis) solid transparent; padding: var(--space-md); color: var(--muted-foreground); font-size: var(--type-body-sm-size); }
  .progress li > span:first-child { display: grid; width: var(--space-xl); height: var(--space-xl); place-items: center; border: var(--border-width-hairline) solid var(--border); border-radius: var(--radius-pill); font-size: var(--type-caption-size); }
  .progress li.current { border-block-end-color: var(--primary); color: var(--foreground); font-weight: var(--type-label-weight); }
  .progress li.current > span:first-child, .progress li.complete > span:first-child { border-color: var(--primary); background: var(--primary); color: var(--primary-foreground); }
  .step-header { display: grid; gap: var(--space-sm); margin-block-end: var(--space-xl); }
  .step-header > p:first-child, .success > p:first-child { color: var(--primary); font-size: var(--type-label-size); font-weight: var(--type-label-weight); letter-spacing: var(--type-label-tracking); text-transform: uppercase; }
  .step-header h2, .step-header p, .success h2, .success p { margin: 0; }
  .step-header h2, .success h2 { font-size: var(--type-heading-2-size); font-weight: var(--type-heading-2-weight); letter-spacing: var(--type-heading-2-tracking); line-height: var(--type-heading-2-line-height); }
  .step-header > p:last-child, .success p { max-width: var(--container-prose); color: var(--muted-foreground); }
  fieldset, .field { display: grid; gap: var(--space-sm); margin: 0 0 var(--space-xl); padding: 0; border: 0; }
  legend, .field > label { margin-block-end: var(--space-sm); font-weight: var(--type-label-weight); }
  .requirement { color: var(--muted-foreground); font-size: var(--type-body-sm-size); font-weight: var(--type-body-weight); }
  .matter-options { display: grid; gap: var(--space-md); }
  .matter-options label { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: var(--space-md); border: var(--border-width-hairline) solid var(--border); border-radius: var(--radius-card); padding: var(--space-lg); cursor: pointer; transition: border-color var(--duration-fast) var(--ease-standard), background-color var(--duration-fast) var(--ease-standard); }
  .matter-options label:hover, .matter-options label.checked { border-color: var(--primary); background: var(--surface); }
  .matter-options input, .choice-row input {
    margin-block-start: var(--space-xs);
    accent-color: var(--primary);
  }
  .matter-options label > span { display: grid; gap: var(--space-xs); }
  .matter-options strong { font-family: var(--font-family-display), serif; font-size: var(--type-heading-4-size); }
  .matter-options small, .helper { color: var(--muted-foreground); font-size: var(--type-body-sm-size); line-height: var(--type-body-sm-line-height); }
  .choice-row { display: flex; flex-wrap: wrap; gap: var(--space-sm); }
  .choice-row label { display: flex; gap: var(--space-sm); align-items: flex-start; border: var(--border-width-hairline) solid var(--border); border-radius: var(--radius-control); padding: var(--space-sm) var(--space-md); cursor: pointer; }
  input[type='text'], input[type='email'], input[type='tel'], textarea { width: 100%; border: var(--border-width-hairline) solid var(--input); border-radius: var(--radius-control); background: var(--background); color: var(--foreground); }
  textarea { resize: vertical; }
  .contact-fields { display: grid; gap: var(--space-lg); }
  .error-field input, .error-field textarea, fieldset.error-field .matter-options label, fieldset.error-field .choice-row label { border-color: var(--danger); }
  .field-error { margin: 0; color: var(--danger); font-size: var(--type-body-sm-size); font-weight: var(--type-label-weight); }
  .error-summary, .submission-error { margin-block-end: var(--space-xl); border: var(--border-width-emphasis) solid var(--danger); background: var(--surface); }
  .error-summary h2, .error-summary p, .submission-error h3, .submission-error p { margin: 0; }
  .error-summary h2, .submission-error h3 { font-size: var(--type-heading-4-size); }
  .error-summary ul { margin-block-end: 0; }
  .error-summary a, .submission-error button { color: var(--danger); font-weight: var(--type-label-weight); }
  .portfolio-helper { border-inline-start: var(--border-width-emphasis) solid var(--accent); padding-inline-start: var(--space-md); color: var(--muted-foreground); font-size: var(--type-body-sm-size); }
  .actions { display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--space-md); margin-block-start: var(--space-xl); }
  .actions--end { justify-content: flex-end; }
  .button { display: inline-flex; min-height: var(--control-height); align-items: center; justify-content: center; border: var(--border-width-hairline) solid transparent; border-radius: var(--radius-control); padding-inline: var(--space-lg); font-size: var(--type-body-sm-size); font-weight: var(--type-label-weight); text-decoration: none; cursor: pointer; }
  .button--primary { border-color: var(--primary); background: var(--primary); color: var(--primary-foreground); }
  .button--secondary { border-color: var(--border); background: transparent; color: var(--foreground); }
  .button:disabled { opacity: 0.6; cursor: wait; }
  .review-groups { display: grid; gap: var(--space-xl); }
  .review-groups > section { border-block-start: var(--border-width-hairline) solid var(--border); padding-block-start: var(--space-lg); }
  .review-heading { display: flex; justify-content: space-between; gap: var(--space-md); align-items: baseline; }
  .review-heading h3 { margin: 0; font-size: var(--type-heading-4-size); }
  .review-heading button { border: 0; background: transparent; color: var(--primary); font-weight: var(--type-label-weight); text-decoration: underline; text-underline-offset: var(--space-xs); }
  .review-groups dl { display: grid; gap: var(--space-md); }
  .review-groups dl div { display: grid; gap: var(--space-xs); }
  .review-groups dt { color: var(--muted-foreground); font-size: var(--type-caption-size); font-weight: var(--type-caption-weight); letter-spacing: var(--type-caption-tracking); text-transform: uppercase; }
  .review-groups dd { margin: 0; }
  .preserve-lines { white-space: pre-wrap; }
  .submission-error { padding: var(--space-lg); }
  .success { display: grid; gap: var(--space-lg); text-align: start; }
  .success .button { width: fit-content; margin-block-start: var(--space-md); }
  .visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; clip-path: inset(50%); }
  @media (min-width: 48rem) {
    .wizard > section, .error-summary { padding: var(--section-compact); }
    .matter-options { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .contact-fields { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .review-groups dl div { grid-template-columns: minmax(0, 1fr) minmax(0, 2fr); }
  }
</style>
