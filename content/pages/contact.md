---
title: Contact
slug: contact
sections:
  # CONTACT FORM
  - type: GenericSection
    title:
      text: Get in Touch
      color: text-dark
      type: TitleBlock
    subtitle: Tell us about your security needs and we'll schedule a conversation.
    text: >-
      Whether you're exploring a consulting engagement, need on-demand engineering capacity, or just want to learn more about how we work — we'd like to hear from you. We typically respond within one business day.
    media:
      type: FormBlock
      fields:
        - name: name
          label: Full Name
          placeholder: Your name
          isRequired: true
          width: 1/2
          type: TextFormControl
        - name: email
          label: Email
          placeholder: your@email.com
          isRequired: true
          width: 1/2
          type: EmailFormControl
        - name: company
          label: Company
          placeholder: Your company
          isRequired: false
          width: 1/2
          type: TextFormControl
        - name: interest
          label: What are you interested in?
          defaultValue: Please choose...
          options:
            - Consulting engagement
            - On-demand engineering
            - Staff augmentation
            - General inquiry
          isRequired: true
          width: 1/2
          type: SelectFormControl
        - name: message
          label: Message
          placeholder: Tell us about your project or needs
          isRequired: true
          width: full
          type: TextareaFormControl
      submitButton:
        label: Send Message
        showIcon: true
        icon: arrowRight
        iconPosition: right
        style: primary
        type: SubmitButtonFormControl
      elementId: contact-form
      styles:
        self:
          padding: [pt-8, pb-8, pl-8, pr-8]
    colors: bg-light-fg-dark
    styles:
      self:
        alignItems: center
        flexDirection: row
        justifyContent: center
        padding:
          - pt-20 sm:pt-28
          - pl-6 md:pl-14
          - pb-20 sm:pb-28
          - pr-6 md:pr-14

  # ALTERNATIVE CONTACT
  - type: GenericSection
    title:
      text: Prefer to reach out directly?
      color: text-dark
      type: TitleBlock
      styles:
        self:
          textAlign: center
    text: >-
      Email us at contact@elysiumcyber.com or schedule a free 30-minute discovery call.
    actions:
      - label: Book a Discovery Call
        url: https://calendly.com/elysiumventuresgroup/30min
        style: primary
        type: Button
      - label: Email Us
        url: mailto:contact@elysiumcyber.com
        style: secondary
        type: Link
    colors: bg-neutral-fg-dark
    styles:
      self:
        justifyContent: center
        padding: [pt-16, pb-16, pl-6, pr-6, md:pl-14, md:pr-14]
        textAlign: center
      text:
        textAlign: center

seo:
  metaTitle: Contact | Elysium Cyber
  metaDescription: Get in touch with Elysium Cyber. Tell us about your cybersecurity consulting needs and we'll schedule a conversation.
  type: Seo

type: PageLayout
---
