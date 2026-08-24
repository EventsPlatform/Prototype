/* ============================================================
   TERMS MODAL
   ============================================================ */
function openTerms() {
  document.getElementById('modalRoot').innerHTML = `
    <div class="modal-overlay" onclick="if(event.target===this) closeTerms()">
      <div class="modal-card" role="dialog" aria-modal="true" aria-label="Terms and Conditions">
        <div class="modal-head">
          <div class="h3" style="font-size:17px;">Terms &amp; Conditions</div>
          <button class="btn btn-ghost btn-sm" onclick="closeTerms()" id="closeTermsBtn">Close</button>
        </div>
        <div class="modal-body">
          <p class="faint" style="margin-bottom:14px;">Last updated August 2026 · Prototype content, for demonstration only.</p>

          <h4>1. Acceptance of terms</h4>
          <p>By creating an account or booking through Lensly, you agree to these Terms &amp; Conditions and to our Privacy Policy.</p>

          <h4>2. The Lensly marketplace</h4>
          <p>Lensly connects service consumers with independent service providers. Providers are independent freelancers or businesses, not employees of Lensly, and are solely responsible for the services they deliver.</p>

          <h4>3. Accounts &amp; verification</h4>
          <p>Providers register either as an individual (freelance / part-time) or as a business. Business accounts must submit a valid Commercial Registration (CR) number and a VAT certificate before their listing goes live. Lensly may suspend or reject accounts that cannot be verified.</p>

          <h4>4. Bookings &amp; payments</h4>
          <p>A security deposit is collected at booking to confirm the date. The remaining service fee is held in escrow and released to the provider once the consumer confirms the work is complete.</p>

          <h4>5. Fees &amp; VAT</h4>
          <p>Lensly charges a platform fee of 5% on each booking. Value Added Tax (VAT) is charged at 15% in accordance with Saudi tax regulations, itemized separately at checkout.</p>

          <h4>6. Cancellations &amp; refunds</h4>
          <p>Deposits, platform fees and VAT become non-refundable once work has begun. Cancellations made before that point may be refunded minus a processing fee.</p>

          <h4>7. Ratings &amp; reviews</h4>
          <p>A provider's rating and review count are not shown publicly until they reach 10 completed, rated bookings, to prevent early reviews from skewing results.</p>

          <h4>8. Certificates &amp; portfolio content</h4>
          <p>Providers are responsible for the accuracy of certificates and media they upload. Lensly may review submissions for quality assurance before or after publishing.</p>

          <h4>9. Liability &amp; disputes</h4>
          <p>Lensly facilitates discovery, payment and communication but is not responsible for the quality of services rendered. Disputes are handled through the in-app resolution process.</p>

          <h4>10. Changes to these terms</h4>
          <p>Lensly may update these terms from time to time. Continued use of the platform after changes take effect constitutes acceptance of the revised terms.</p>
        </div>
      </div>
    </div>`;
}
function closeTerms() { document.getElementById('modalRoot').innerHTML = ''; window.currentModalEscape = null; }
